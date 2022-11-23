const compareDates = (d1, d2) => {
    let date1 = new Date(d1)
    let date2 = new Date(d2)
    console.log(date1);
    console.log(date2);
  
    if (date1 < date2) {
      console.log(`${d1} is less than ${d2}`);
    } else if (date1 > date2) {
      console.log(`${d1} is greater than ${d2}`);
    } else {
      console.log(`Both dates are equal`);
    }
  };
  
  compareDates("06/21/2022", "07/28/2021");
  compareDates("01/01/2001", "01/01/2001");
  compareDates("11/01/2021", "02/01/2022");
  
  // This will return:
  
  // "06/21/2022 is greater than 07/28/2021"
  // "Both dates are equal"
  // "11/01/2021 is less than 02/01/2022"