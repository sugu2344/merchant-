//  import React, { useState } from 'react';
//import React, { useState } from 'react';
import React from "react";
interface Person  {
  name: string;
  email: string;
  phone: number;
  website: string;
  contact: string;
  number : number;
  another: string;
  notes : string;
  type : string[];
  category :string[];
  commission : number;
  date : string;
  logo: string;
criticalAccount:  string[];
  payment : string[];
  [key: string]: string | number  | string[] ;
}
interface FormProps {
  editIndex: number | null;
  editFormData: Person | null;
  handleEditSubmit: (index: number, editedPerson: Person) => void
  formData: Person;
  selectedType: string;
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    field: string
  ) => void;
  // AddPerson: (event: React.FormEvent) => void;
  handleFormSubmit: (event: React.FormEvent)=>void;
  setSelectedType: React.Dispatch<React.SetStateAction<string>>;
  // setCriticalAccount: React.Dispatch<React.SetStateAction<boolean>>;
     setEditIndex:React.Dispatch<React.SetStateAction<number>>;
     setEditFormData:React.Dispatch<React.SetStateAction<string>>;
}
const Merchant: React.FC<FormProps> = ({
  editIndex,
  editFormData,
  formData,
  selectedType,
  handleInputChange,
  setSelectedType,
  // setCriticalAccount,
  handleEditSubmit,
  handleFormSubmit
}) => {
//  const handleCriticalAccountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setCriticalAccount(event.target.checked);
//   };
  // const handleFormSubmit = (event: React.FormEvent) => {
  //   event.preventDefault();
  //   if (editIndex !== null) {
  //     handleEditSubmit(editIndex,formData);
  //   } else {
  //     AddPerson(event); // Call AddPerson for new person submission
  //   }
  //   }
    // const handleSubmit = async (event:React.FormEvent) => {
    //   event.preventDefault();
    //   try {
    //     // Make a POST request to your backend endpoint
    //     const response = await axios.post('http://localhost:3005/', formData);
    //     // Handle the response, update state, etc.
    //     console.log('Data sent successfully:', response.data);
    //   } catch (error) {
    //     // Handle errors (e.g., network error, server error)
    //     console.error('Error sending data:', error);
    //   }
    // };
  return (
<div>
    <h1 className='head' >Merchant Form</h1>
    <form id="myForm" onSubmit={handleFormSubmit}>
      <label  htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={(event) => {handleInputChange(event, "name")}}
      />
      <label>Email</label>
      <input
        type="text"
        name="email"
        id="email"
        value={ formData.email}
        onChange={(event) => {handleInputChange(event, "email")}}
      />
      <label>PhoneNumber</label>
      <input
        type="tel"
        name="phone"
        id="number"
        value={formData.phone}
        onChange={(event) => {handleInputChange(event, "phone")}}
      />
      <label>website</label>
      <input
        type="text"
        id="website"
        name="website"
        value={formData.website}
        onChange={(event) => {handleInputChange(event, "website")}}
      />
      <label>contactname</label>
      <input
        type="text"
        id="contact"
        name="contact"
        value={formData.contact}
        onChange={(event) => {handleInputChange(event, "contact")}}
      />
      <label>contactnumber</label>
      <input
        type="tel"
        id="phone"
        name="number"
        value={formData.number}
        onChange={(event) => {handleInputChange(event, "number")}}
      />
      <label>ContactMail</label>
      <input
        type="email"
        id="another"
        name="another"
        value={formData.another}
        onChange={(event) => {
          setSelectedType(event.target.value);
          handleInputChange(event, "another");
        }}
      />
      <label>Notes</label>
      <textarea
        name="notes"
        id="notes"
        value={formData.notes}
        onChange={(event) => {handleInputChange(event, "notes")}}
      ></textarea>
      <label>Type:</label>
      <label>Small buisiness</label>
      <input
        type="radio"
        name="type"
        value="small business"
       checked={selectedType === "small business"}
        onChange={(event) => {
          setSelectedType(event.target.value);
          handleInputChange(event, "type");
        }}
      />
      <label>Entreprise</label>
      <input
        type="radio"
        name="type"
        value="Entreprise"
        checked={selectedType === "Entreprise"}
        onChange={(event) => {
          setSelectedType(event.target.value); // Update the selected type
          handleInputChange(event, "type"); // Handle form input change
        }}
      />
      <label>Entreprenuer</label>
      <input
        type="radio"
        name="type"
        value="Entreprenuer"
        checked={selectedType === "Entreprenuer"}
        onChange={(event) => {
          setSelectedType(event.target.value); // Update the selected type
          handleInputChange(event, "type"); // Handle form input change
        }}
      />
      <label> category</label>
      <select
  multiple
  name="category"
  id="category"
  onChange={(event) => handleInputChange(event, "category")}
>
  <option value="clothes" selected={formData.category.includes("clothes")}>clothes</option>
  <option value="toys" selected={formData.category.includes("toys")}>toys</option>
  <option value="electronics" selected={formData.category.includes("electronics")}>electronics</option>
  <option value="groceries" selected={formData.category.includes("groceries")}>groceries</option>
  <option value="digital" selected={formData.category.includes("digital")}>digital</option>


</select>

      <label>commmission</label>
      <input
        type="number"
        name="commission"
        id="commission"
        value={
          formData.commission
        }
        onChange={(event) => {handleInputChange(event, "commission")}}
      />
      <label>Activeform</label>
      <input
        type="date"
        name="date"
        id="date"
        value={formData.date}
        onChange={(event) => {handleInputChange(event, "date")}}
      />
      <label>LOGO</label>
      <input
        type="file"
        name="file"
        id="file"
        value={formData.logo}
        onChange={(event) => {handleInputChange(event, "logo")}}
      />
      <label>Critical Account</label>
      Yes <input
  type="checkbox"
  id="criticalAccountNo"
  name="criticalAccountNo"
  checked={formData.criticalAccount.includes('No')}
  onChange={(event) => handleInputChange(event, 'criticalAccount')}
/>

{/* No <input
  type="checkbox"
  id="criticalAccountNo"
  name="criticalAccountNo"
  value = " "
 checked = {formData.criticalAccountNo.length<0}
  onChange={(event) => handleCriticalAccountNoChange(event)}
/> */}
 <label htmlFor="Payment">Payment</label>
      <select
        name="payment"
        id="payment"
        value={formData.payment}
        onChange={(event) => {handleInputChange(event, "payment")}}
      >
        <option value="cash">Cash on Payment</option>
        <option value="upi">UPI</option>
        <option value="card">Card on payment</option>
      </select>
      <input
        type="submit"
        value={editIndex !== null ? "Edit" : "Submit"}
        // onClick={editIndex !== null ? handleEditSubmit : AddPerson}
      />
    </form>
    {/* <App/> */}
    </div>
  );
};
export default Merchant;







