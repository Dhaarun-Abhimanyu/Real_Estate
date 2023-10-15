import openpyxl

# Load the Excel file
workbook = openpyxl.load_workbook('test_data.xlsx')

# Select a specific worksheet
worksheet = workbook['Sheet1']  # Replace 'YourWorksheetName' with the actual sheet name

# Access data from a specific cell (e.g., A1)
data = worksheet['A1'].value
print(data)
