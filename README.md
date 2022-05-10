# Brief Media React Assessment

## Challenge
Your task is to utilize a simple API to create a `Contact Management` web application. Using RESTful endpoints, you should create an application that can create, read, update, and delete contacts.

## API Definitions

### Create:
curl --location --request POST '/api/v1/contact' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstName": "John",
    "lastName": "Doe",
    "birthDate": "1985/06/21",
    "address": "1234 S. Riverwood Rd., Cincinnati, Ohio, 45203",
    "emailAddresses": ["jdoe@briefmedia.com", "jooeisnotreal@somerandomnonexistanturl.org"],
    "phoneNumbers": [
        {
            "type": "Home",
            "number": "+18135555555"
        },
        {
            "type": "Cell",
            "number": "+14571235467"
        }
    ]
}'

### Read 1
curl --location --request GET '/api/v1/contact?id=123'

### Read Multiple
curl --location --request GET '/api/v1/contact?page=0&offset=1'

### Update (OK to only pass updated fields)
curl --location --request PUT '/api/v1/contact' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": 1,
    "firstName": "Chuck",
    "lastName": "Norris",
    "birthDate": "1940/03/10",
    "address": "Everywhere"
}'

### Delete
curl --location --request DELETE '/api/v1/contact?id=123'

### What we are looking for
We are attempting to evaluate your proficiency and confidence with React and Javascript.
Please spend the most time on the portions of the app that will best demonstrate your aptitude
for the role for which you are being considered. If time is a constraint, we would rather see a few things done
well than many things done to a lower standard.
Please use good programming patterns.
Really, we are just looking for good code.

##### Tests:
* Please include unit tests for your code.

### Question?

Email questions to:
    
Becca Thompson 
[becca@briefmedia.com](mailto:becca@briefmedia.com)