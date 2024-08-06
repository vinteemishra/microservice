# Cert-service

### Curl command

```bash
curl localhost:3010/cert \
    -H "x-sda-auth: <API-key>" \
    -H "content-type: application/json" \
    -d '{
            "name": "Svenn",
            "jobTitle": "Snowman",
            "certDates": [1603301151196, 1603306151196],
            "certHeader": "This certificate is granted to",
            "certBody": "for successfully completing the MyLearning",
            "certBody1": "certification exam in the Safe Delivery App",
            "certBody2": "and earning the title of:",
            "language": "English",
            "uniqueId": "214OG-8BSNL",
            "country": "IN"
    }' \
    --output ~/Desktop/cert_test.png && open ~/Desktop/cert_test.png
```