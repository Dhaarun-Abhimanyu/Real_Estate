import openpyxl

# Load the Excel file
workbook = openpyxl.load_workbook('test_data.excel')

# Select a specific worksheet
worksheet = workbook['Sheet1']

# Access a specific cell and set its value
worksheet['A1'] = 'New Value'

# Save the changes to the Excel file
workbook.save('test_data.excel')
