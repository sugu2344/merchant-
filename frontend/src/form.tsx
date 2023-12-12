import React, { useState,useEffect } from "react";
// import Merchant from "./form";
import Table from "./form2";
import Filter from "./form3";
import Merchant from "./form4";
// import "./merchant.css";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:5000/student";
export interface Person {
  name: string;
  email: string;
  phone: number;
  website: string;
  contact: string;
  number: number;
  another: string;
  notes: string;
  type: string[];
  category: string[];
  commission: number;
  date: string;
  logo: string;
  criticalAccount: string[];
  payment: string[];
  [key: string]: string | number | string[];
}
const App = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [formData, setFormData] = useState<Person>({
   name: "",
    email: "",
    phone: 0,
    website: "",
    contact: "",
    number: 0,
    another:  "",
    notes: "",
    type: [],
    category: [],
    commission: 0,
    date: "",
    logo: "",
    criticalAccount: [],
    payment: [],
  });
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<Person | null>(null);
  const [selectedType, setSelectedType] = useState<string>(""); // Declare selectedType at the top
  const [nameFilter, setNameFilter] = useState("");
  const [phoneFilter, setPhoneFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [isFilterMode, setIsFiltermode] = useState(false);
  const ApplyFilter = (event: React.FormEvent) => {
    event.preventDefault();
    setIsFiltermode(true);
  };
useEffect(()=>{
  axios.get('/')
  .then((response)=>{
    setPersons(response.data ||[]);
  })
  .catch((error)=>{
    console.error('Error in Fetching Data',error);
  })
},[]);
  const Backtoform = (event: React.FormEvent) => {
    event.preventDefault();
    setIsFiltermode(false);
  };
  const FilteredPersons = Array.isArray(persons)
  ? persons.filter((person: Person) => {
      return (
        person.name &&
        nameFilter &&
         person.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
         person.phone.toString().includes(phoneFilter) &&
        (typeFilter === "" || person.type.includes(typeFilter)) &&
        (paymentFilter === "" || person.payment.includes(paymentFilter))
      );
    })
  : [];
  const [newPerson, setNewPerson] = useState<Person>({
    name: "",
    email: "",
    phone: 0,
    website: "",
    contact: "",
    number: 0,
    another: "",
    notes: "",
    type: [],
    category: [],
    commission: 0,
    date: "",
    logo: "",
    criticalAccount: [],
    // criticalAccountNo: [],
    payment: [],
  });
  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    field: string
  ) => {
    const { name, value, type } = event.target;
    if (type === "checkbox") {
      // For checkboxes, handle checked state directly
      const checkbox = event.target as HTMLInputElement;
      const updatedArray = checkbox.checked ? ["Yes"] : [];
      if (editIndex !== null) {
        // If in edit mode, update the editFormData
        setEditFormData((prevData) => {
          return {
            ...(prevData as Person),
            [field]: updatedArray,
          };
        });
      } else {
        // Otherwise, update the regular formData
        setFormData((prevData) => {
          return {
            ...prevData,
            [field]: updatedArray,
          };
        });
      }
    } else {
      // Handle other input types (text, select, textarea, number)
      setFormData((prevData) => {
        return {
          ...prevData,
          [name]: type === "number" ? parseInt(value, 10) : value,
        };
      });
      // Create newPerson object with updated form data
      const newPerson: Person = {
        name: name === "name" ? value : formData.name,
        email: name === "email" ? value : formData.email,
        phone: name === "phone" ? parseInt(value, 10) : formData.phone,
        website: name === "website" ? value : formData.website,
        contact: name === "contact" ? value : formData.contact,
        number: name === "number" ? parseInt(value, 10) : formData.number,
        another: name === "another" ? value : formData.another,
        notes: name === "notes" ? value : formData.notes,
        type: name === "type" ? [value] : formData.type,
        category: name === "category" ? [value] : formData.category,
        commission: name === "commission" ? Number(value) : formData.commission,
        date: name === "date" ? value : formData.date,
        logo: name === "logo" ? value : formData.logo,
        criticalAccount: name === "criticalAccount" ? ["yes"] : ["No"],
        // criticalAccountNo: name === "criticalAccountNo" ? ["No"] : [],
        payment: name === "payment" ? [value] : formData.payment,
        [name]: type === "number" ? parseInt(value, 10) : value, // Parse number type inputs
        // [field]: type === 'checkbox' ? (checked ? ['Yes'] : []) : [value], // Handle checkbox and other fields
      };
      // Set the newPerson state
      setNewPerson(newPerson);
    }
  };
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Data Transfered Successfully',newPerson)
    // Check if in edit mode
    if (editIndex !== null) {
      // If in edit mode, call handleEditSubmit for edit operation with newPerson
      axios.put(`http://localhost:5000/student/${editFormData?._id}`, newPerson)
        .then((response) => {
          const updatedPersons = [...persons];
          updatedPersons[editIndex] = response.data;
          setPersons(updatedPersons);
          setEditIndex(null);
          setEditFormData(null);
          setSelectedType('');
          console.log("Data edited successfully")
        })
        .catch((error) => {
          console.error('Error editing person:', error);
        });
    } else {
      // If not in edit mode, add the new person to the state after a successful POST request
      axios.post('http://localhost:5000/student', newPerson)
        .then((response) => {
          setPersons((prevPersons) => [...prevPersons, response.data]);
          console.log('Data added successfully');
        })
        .catch((error) => {
          console.error('Error adding person:', error);
        });
    }
    // Reset the form data and other state variables after submission
    setFormData({
      name: "",
      email: "",
      phone: 0,
      website: "",
      contact: "",
      number: 0,
      another: "",
      notes: "",
      type: [],
      category: [],
      commission: 0,
      date: "",
      logo: "",
      criticalAccount: [],
      payment: [],
    });
    setSelectedType("");
    setNewPerson({
      name: "",
      email: "",
      phone: 0,
      website: "",
      contact: "",
      number: 0,
      another: "",
      notes: "",
      type: [],
      category: [],
      commission: 0,
      date: "",
      logo: "",
      criticalAccount: [],
      payment: [],
    });
  };
  const handleDelete = (index: number) => {
  const confirmDelete = window.confirm('Are you sure you want to delete this person?');
  if (confirmDelete) {
    const personToDelete = persons[index];
    axios.delete(`http://localhost:5000/student/${personToDelete._id}`)
      .then(() => {
        const updatedPersons = [...persons];
        updatedPersons.splice(index, 1);
        setPersons(updatedPersons);
        console.log("Data deleted successfully")
      })
      .catch((error) => {
        console.error('Error deleting person:', error);
      });
  }
};
  const handleEdit = (index: number) => {
    const editedPerson = persons[index];
    console.log("Editing Person: ", editedPerson);
    setEditIndex(index);
    setEditFormData(editedPerson);
    setFormData(editedPerson);
  };
  const handleEditSubmit = (index: number, editedPerson: Person) => {
    // Update the persons state with the edited person at the specified index
    const updatedPersons = [...persons];
    updatedPersons[index] = editedPerson;
    setPersons(updatedPersons);
    // Reset edit state
    setEditIndex(null);
    setEditFormData(null);
    setSelectedType("");
  };
  ;
  // const handleEditSubmit = (index: number, editedPerson: Person) => {
  //   // Update the persons state with the edited person at the specified index
  //   const updatedPersons = [...persons];
  //   updatedPersons[index] = editedPerson;
  //   setPersons(updatedPersons);
  //   // Reset edit state
  //   setEditIndex(null);
  //   setEditFormData(null);
  //   setSelectedType("");
  // };
  return (
    <div>
      <Merchant
        editIndex={editIndex}
        handleEditSubmit={handleEditSubmit}
        editFormData={editFormData}
        formData={formData}
        selectedType={selectedType}
        handleInputChange={handleInputChange}
        setSelectedType={setSelectedType}
        handleFormSubmit={handleFormSubmit}
        // setCriticalAccountNo={setCriticalAccountNo}
        // handleEditSubmit={handleEditSubmitWrapper}
        // AddPerson={AddPerson}
        setEditIndex={function (value: React.SetStateAction<number>): void {
          throw new Error("Function not implemented.");
        }}
        setEditFormData={function (value: React.SetStateAction<string>): void {
          throw new Error("Function not implemented.");
        }}
      />
      <Filter
        nameFilter={nameFilter}
        setNameFilter={setNameFilter}
        phoneFilter={phoneFilter}
        setPhoneFilter={setPhoneFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        paymentFilter={paymentFilter}
        setPaymentFilter={setPaymentFilter}
        ApplyFilter={ApplyFilter}
        Backtoform={Backtoform}
        isFilterMode={isFilterMode}
        FilteredPersons={FilteredPersons} // Pass FilteredPersons as a prop
      />
      <Table
        persons={isFilterMode ? FilteredPersons : persons}
        handleEdit={handleEdit}
        handleEditSubmit={handleEditSubmit}
        handleDelete={handleDelete}
        // AddPerson={AddPerson}
        // handleEditSubmit={handleEditSubmitWrapper}
        handleFormSubmit={handleFormSubmit}
      />
    </div>
  );
};
export default App;