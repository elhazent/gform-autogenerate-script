
function submitFakeData(email,nama,index) {
  const formUrl = 'https://docs.google.com/forms/d/1WblFa4uCK_TYh8WK3Bs3GYOvrG1bk637KbL_vXy46v4/edit';
  console.log("berhasil 1");
  const form = FormApp.openByUrl(formUrl);
  console.log("berhasil 2");
  const ageChoices = ['< 20', '20 - 25', '26 - 30', '> 30'];
  const usageChoices = ['5 - 8 Tahun', '3 - 5 Tahun', '1 - 3 Tahun', '1 - 12 Bulan'];
  console.log(Math.floor(Math.random() * usageChoices.length));
  console.log(usageChoices[Math.floor(Math.random() * usageChoices.length)]);
  const formItems = form.getItems();
  

  // Fungsi untuk menghasilkan data palsu
  function getRandomData(type, choices) {
    switch(type) {
      case 'AGE':
        return choices[Math.floor(Math.random() * choices.length)];
      case 'USAGE':
        return choices[Math.floor(Math.random() * choices.length)];
      case 'GRID':
        return Math.floor(Math.random() * 5) + 1;
      default:
        return 'Sample Data';
    }
  }

  // Mendapatkan pilihan untuk umur dan lama pemakaian aplikasi
  

  // Loop melalui setiap email di daftar email
  const responses = {};
  const formResponse = form.createResponse();
    formItems.forEach(item => {
    const itemType = item.getType();
    let response;
    switch(itemType) {
      case FormApp.ItemType.TEXT:
        if (item.getTitle().toLowerCase().includes('email')) {
          response = email;
        } else if (item.getTitle().toLowerCase().includes('nama')) {
          response = nama;
        }
        formResponse.withItemResponse(item.asTextItem().createResponse(response));
        break;
      case FormApp.ItemType.MULTIPLE_CHOICE:
        if (item.getTitle().toLowerCase().includes('umur')) {
          response = getRandomData('AGE', ageChoices);
        } else if (item.getTitle().toLowerCase().includes('lama pemakaian aplikasi')) {
          response = getRandomData('USAGE', usageChoices);
        }
        formResponse.withItemResponse(item.asMultipleChoiceItem().createResponse(response));
        break;
      case FormApp.ItemType.GRID:
        const gridItem = item.asGridItem();
        const rows = gridItem.getRows();
        const columns = gridItem.getColumns(); // Fetch the columns of the GridItem
        const gridResponse = [];

        rows.forEach(row => {
          const randomColumn = columns[Math.floor(Math.random() * columns.length)]; // Choose a random column for each row
          gridResponse.push(randomColumn);
        });

        formResponse.withItemResponse(gridItem.createResponse(gridResponse));
          break;
      default:
        response = 'Unknown type';
    }
  });

  // Mengirim respons
  try {
    formResponse.submit();
    console.log("Response submitted successfully! data ke" + index);
  } catch (e) {
    console.error("Error submitting response: " + e.toString());
  }
}

function main(){
const emailList = [
    //list of email
];

let titleCasedEmails = [
    //list of name
];

for (let i = 0; i < titleCasedEmails.length; i++) {
    submitFakeData(emailList[i],titleCasedEmails[i],i+1);
}

 
}
