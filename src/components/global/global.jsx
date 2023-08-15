import React, {useEffect, useState} from 'react';
import Admin from '../admin/Admin.jsx'
import Student from '../student/Student.jsx'
const Global = () =>
{
    // const getProfile = async () => {
    //   try {
    //     console.log(email.current)
    //     let user_email = email.current
    //     const res = await fetch(`https://production-learnlaunchnexus.onrender.com/init/${user_email}`, {
    //       method: "GET",
    //     });
  
    //     const parseData = await res.json();
    //     setName(parseData.first_name);
    //     setAdmin(parseData.isadmin)
    //   } catch (err) {
    //     console.error(err.message);
    //   }
    // };

    if (user.isadmin) {
      return (
        <>
        <Admin/>
        </>
    )} else {
      return (
      <>
        
        <Student/>
      </>
      )
    }
  }