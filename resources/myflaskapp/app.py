from flask import Flask, render_template, request, jsonify
import pandas as pd

app = Flask(__name__, template_folder='templates')

# Define the path to the Excel file
EXCEL_FILE = 'C:\\Users\\Dhaarun\\Desktop\\resources\\myflaskapp\\test_data.xlsx'
SHEET_NAME = 'Sheet1'


@app.route('/')
def index():
    # Read data from Excel file
    df = pd.read_excel(EXCEL_FILE, sheet_name=SHEET_NAME)
    
    # Convert data to a list of dictionaries
    properties = df.to_dict(orient='records')
    
    # Get unique locations for the location filter
    unique_locations = df['LOCATION'].unique()

    return render_template('index.html', properties=properties, unique_locations=unique_locations)

@app.route('/append_data', methods=['POST'])
def append_data():
    try:
        data = request.get_json()

        # Read data from Excel file
        df = pd.read_excel(EXCEL_FILE, sheet_name=SHEET_NAME)

        # Append new data
        df = df.append(data, ignore_index=True)

        # Write the updated data back to the Excel file
        with pd.ExcelWriter(EXCEL_FILE, engine='openpyxl', mode='a', if_sheet_exists='replace') as writer:
            df.to_excel(writer, sheet_name=SHEET_NAME, index=False)

        return jsonify({"message": "Data appended successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
