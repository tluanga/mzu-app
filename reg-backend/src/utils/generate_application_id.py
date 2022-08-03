from uuid import uuid4
from datetime import date


def generate_application_Id():
    end_tag = uuid4()
    final_tag = str(end_tag)[:8]

    # Get current year
    todays_date = date.today()
    current_year = todays_date.year
    formatted_year = str(current_year)[:2]
    application_id = 'mzureg-'+final_tag

    return application_id
