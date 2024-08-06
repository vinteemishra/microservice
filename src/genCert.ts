import { createCanvas, loadImage, registerFont } from 'canvas';
import * as fs from 'fs';
import * as Koa from 'koa';
import * as path from 'path';
import { Url } from 'url';
import { missingParameter } from './utils';
import { prettyPrintCertDate, nonEmptyString } from './helper';
import { ICertData } from './interfaces';
import { logger } from './logger';

// Handler function for generating a CHAMPION Certificate using the parameters received in the POST request

export const handleGeneration = async (ctx: Koa.Context, url: Url) => {
  // Check for missing parameters
  if (missingParameter(ctx, url)) {
    return;
  }

  ctx.type = 'png';

  ctx.body = await renderCertificate(ctx.request.body);
};

// Function to get the base image file for the certificate from the assests folder

async function getBaseFile(
  country: string | undefined,
  isModuleCertificate: boolean = false
): Promise<string> {
  // Check if the country is not s tring or if its length is not equal to 2

  const defaultCert = 'New_certificate.png';
  const defaultModuleCert = 'New_certificate_module.png';

  const defaultRetval =
    isModuleCertificate === true ? defaultModuleCert : defaultCert;

  if (typeof country !== 'string' || country.trim().length !== 2) {
    logger.warn('Invalid country value, returning default');
    return defaultRetval;
  }

  const championCert = `New_certificate_${country.toUpperCase()}.png`;
  const moduleCert = `New_certificate_${country.toUpperCase()}${
    isModuleCertificate ? '_module' : ''
  }.png`;
  const championCertPath = path.join(
    __dirname,
    'assets/templates',
    championCert
  );
  const moduleCertPath = path.join(__dirname, 'assets/templates', moduleCert);

  if (isModuleCertificate) {
    return fs.existsSync(moduleCertPath) === true
      ? moduleCert
      : defaultModuleCert;
  }

  if (fs.existsSync(championCertPath)) {
    return fs.existsSync(moduleCertPath) === true ? championCert : defaultCert;
  }

  return defaultRetval;
}

// Function to create a certificate in a specific language

async function renderCertificate(profile: ICertData) {
  let {
    jobTitle,
    name,
    certHeader,
    certBody,
    certBody1,
    certBody2,
    certDates,
    language,
    uniqueId,
    memberId,
    country,
    isManyataUser
  } = profile;

  const isModuleCertificate =
    certBody1 && certBody1.includes('module') ? true : false;

  // console.log("cert-service -> header: ", certHeader);
  // console.log("cert-service -> body: ", certBody);
  // console.log("cert-service -> body1: ", certBody1);
  // console.log("cert-service -> body2: ", certBody2);
  // console.log("cert-service -> language: ", language);

  // Make new local version of the certDates array
  const _certDates = certDates;
  // Get the latest 5 entries
  _certDates.slice(Math.max(_certDates.length - 5, 1));

  // Map though and prettyPrint the dates
  const prettyPrintedDates = _certDates.map((date) =>
    prettyPrintCertDate(date)
  );
  // Fill the 5 dates with the formatted dates
  const date_1 = prettyPrintedDates[0];
  const date_2 = prettyPrintedDates[1];
  const date_3 = prettyPrintedDates[2];
  const date_4 = prettyPrintedDates[3];
  const date_5 = prettyPrintedDates[4];

  // Set the dimentions for the canvas
  const canvas = createCanvas(1920, 1357);
  const context = canvas.getContext('2d');

  // context.fillStyle = 'white'; //Make the background of the canvas white
  // context.fillRect(0, 0, 1920, 1357); //Make the background of the canvas white and fill the whole canvas

  // Due to specific landuages, there has to be set a font for that specific language in order to show the text correct on the certificate
  switch (language) {
    case 'Bangladesh - Bangla':
      registerFont(
        path.join(__dirname, 'assets/fonts', 'NotoSansBengali-Light.ttf'),
        { family: 'NotoSansBengali-Light', style: 'normal' }
      );
      context.font = 'normal normal 40px NotoSansBengali-Light'; //Use the custom font 'Chiret-Regular' for Amharic text's
      break;
    case 'Ethiopia - Amharic':
      registerFont(
        path.join(__dirname, 'assets/fonts', 'NotoSansEthiopic-Light.ttf'),
        { family: 'NotoSansEthiopic-Light', style: 'normal' }
      );
      context.font = 'normal normal 30px NotoSansEthiopic-Light'; //Use the custom font 'Chiret-Regular' for Amharic text's
      break;
    case 'India - Hindi':
      registerFont(
        path.join(__dirname, 'assets/fonts', 'NotoSansDevanagari-Light.ttf'),
        { family: 'NotoSansDevanagari-Light', style: 'normal' }
      );
      context.font = 'normal normal 30px NotoSansDevanagari-Light'; //Use the custom font 'Chiret-Regular' for Amharic text's
      break;
    case 'Cambodia':
      registerFont(path.join(__dirname, 'assets/fonts', 'Khmer-Regular.ttf'), {
        family: 'Khmer-Regular',
        style: 'normal'
      });
      context.font = 'normal normal 30px Khmer-Regular';
      break;
    default: //Use the custom font 'Chiret-Regular' for Amharic text's
      registerFont(path.join(__dirname, 'assets/fonts', 'NotoSans-Light.ttf'), {
        family: 'NotoSans-Light',
        style: 'normal'
      });
      context.font = 'normal normal 30px NotoSans-Light';
      break;
  }

  




  // Getting the base image for creating the certificate
  const basePng = await getBaseFile(country, isModuleCertificate);
  const p2 = path.join(__dirname, 'assets/templates', basePng);
  const img = await loadImage(p2);
  context.drawImage(img, 0, 0, 1920, 1357);

  const unfilledStar = path.join(
    __dirname,
    'assets',
    'stjerne_gennemsigtig.png'
  );
  const filledStar = path.join(__dirname, 'assets', 'stjerne_gul.png');
  const img_unfiledStar = await loadImage(unfilledStar);
  const img_filedStar = await loadImage(filledStar);

  // There will be a unfliied or a filled star to the side of the dates
  {
    !date_1
      ? context.drawImage(img_unfiledStar, 1360, 380, 70, 70)
      : context.drawImage(img_filedStar, 1360, 380, 70, 70);
  }
  {
    !date_2
      ? context.drawImage(img_unfiledStar, 1360, 475, 70, 70)
      : context.drawImage(img_filedStar, 1360, 475, 70, 70);
  }
  {
    !date_3
      ? context.drawImage(img_unfiledStar, 1360, 575, 70, 70)
      : context.drawImage(img_filedStar, 1360, 575, 70, 70);
  }
  {
    !date_4
      ? context.drawImage(img_unfiledStar, 1360, 670, 70, 70)
      : context.drawImage(img_filedStar, 1360, 670, 70, 70);
  }
  {
    !date_5
      ? context.drawImage(img_unfiledStar, 1360, 770, 70, 70)
      : context.drawImage(img_filedStar, 1360, 770, 70, 70);
  }

  context.textAlign = 'center'; //Alignment - ie. left, right, center, start, end
  context.fillStyle = '#333'; //Color

  //First number is horizontal, and second number is vertical. Starting from the top left corner!
  context.fillText(jobTitle, 435, 485);
  context.fillText(name, 980, 485);
  nonEmptyString(memberId) && context.fillText(memberId, 710, 406);
  context.fillText(certHeader, 710, 355);
  context.fillText(certBody, 710, 570);
  context.fillText(certBody1, 710, 610);
  context.fillText(certBody2, 710, 650);

  // context.font = "normal normal 25px 'Ubuntu Light'"; //The dates need to be a slight lesser size
  context.font = "normal normal 25px 'NotoSans-Light'"; //The dates need to be a slight lesser size
  {
    !date_1 ? null : context.fillText(date_1, 1525, 425);
  }
  {
    !date_2 ? null : context.fillText(date_2, 1525, 522);
  }
  {
    !date_3 ? null : context.fillText(date_3, 1525, 620);
  }
  {
    !date_4 ? null : context.fillText(date_4, 1525, 717);
  }
  {
    !date_5 ? null : context.fillText(date_5, 1525, 814);
  }

  if (nonEmptyString(uniqueId)) {
    context.save();
    context.font = "normal normal 20px 'monospace'";
    context.translate(1815, 678);
    context.rotate(-Math.PI / 2);
    context.textAlign = 'center';
    context.fillText(`ID: ${uniqueId}`, 0, 0);
    context.restore();
  }

  // If the user is a Manyata user, load and draw the Manyata logo
  if(country==='IN'){
   if (isManyataUser) {
    const manyataLogoPath = path.join(__dirname, '..', 'assets', 'templates', 'manyata_logo.png');

    if (fs.existsSync(manyataLogoPath)) {
        try {
            const imgManyataLogo = await loadImage(manyataLogoPath);
            console.log(imgManyataLogo);
            // context.drawImage(imgManyataLogo, 1500, 50, 300, 100);
            context.drawImage(imgManyataLogo, 1500, 80, 100, 80);

            console.log("Manyata logo drawn successfully");
        } catch (error) {
            console.error("Error loading or drawing Manyata logo:", error);
        }
    } else {
        console.error("Manyata logo file does not exist:", manyataLogoPath);
    }
}
}
  return canvas.toBuffer();
}




