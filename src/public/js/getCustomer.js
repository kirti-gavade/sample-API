let name = {	'sys_user_id': '5b7a983e4aac97119c29af4c'};
$(document).ready(function() {
    $.ajax({
      url: 'https://customer-management-extentia.herokuapp.com/api/customer/retrieveall',
      headers: {
        'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNWI3YTk4M2U0YWFjOTcxMTljMjlhZjRjIiwiZW1haWwiOiJ2cnVzaGFiaEBnbWFpbC5jb20iLCJpYXQiOjE1MzQ3NjEwMjJ9.zaaMrQwiKu_MOaHvOvjLcKdEgWh1W4NKx2kX8wV-k1o',
        'Content-Type':'application/json'

      },
      type: 'POST',
      data: JSON.stringify(name),
      contentType: "application/json",
      success: function (data1) {
     
        console.log('success', data1);
      },

      error: function (XMLHttpRequest, textStatus, errorThrown) {
        console.log('error', errorThrown);
      }
    });
  });
   
