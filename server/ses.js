const aws = require("aws-sdk");

module.exports.sendEmail = (subject, body, recipient) => {
    let secrets;
    if (process.env.NODE_ENV == "production") {
        secrets = process.env; // in prod the secrets are environment variables
    } else {
        secrets = require("./secrets"); // in dev they are in secrets.json which is listed in .gitignore
        const ses = new aws.SES({
            accessKeyId: secrets.AWS_KEY,
            secretAccessKey: secrets.AWS_SECRET,
            region: "eu-central-1",
        });

        return ses
            .sendEmail({
                Source: "Harisri <harisri.mikkilineni@gmail.com>",
                Destination: {
                    ToAddresses: [recipient],
                },
                Message: {
                    Body: {
                        Text: {
                            Data: body,
                        },
                    },
                    Subject: {
                        Data: subject,
                    },
                },
            })
            .promise()
            .then(() => console.log("Email delivery successful!"))
            .catch((err) => console.log(err));
    }
};
