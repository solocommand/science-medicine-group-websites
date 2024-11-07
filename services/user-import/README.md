User data importer
===
This service can be used to upsert user data from CSVs with the following columns


| date | first name | last name | email | job title | company |
| --- | --- | --- | --- | --- |
| 1/1/2024 6:22:28 | Jane | Doe | jane.doe@gmail.com | QA Tester | Company Name |

For more examples, review the [sample data file](./data/Import_test.csv).

Before attempting to import new data, download the segment data (Braze segment edit, user data, csv export email addresses) and store it under the `data/segments/` folder, named as `<segment-id>.csv`. This powers the analysis of insert vs update vs invalid stats.

After storing the segment CSV data (and the new dataset under the `data/` folder), execute the following to start the importer:
```sh
docker compose run user-import
```
1. Select the data file (your new dataset)
2. Select the site to use (identifies API and target subscription group membership)
3. Confirm estimated metrics look correct before continuing.

## Required ENVs
To execute this against production data, you must set the following ENV values:

```ini
NODE_ENV=production
IDENTITYX_API_KEY_AM=some-key
IDENTITYX_API_KEY_DRB=some-other-key
```
