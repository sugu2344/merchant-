import React,{useState} from "react";


// In your Table component file
interface Person {
  name: string;
  email: string;
  phone: number;
  website: string;
  contact: string;
  number: number;
  another: string;
  notes: string;
  type: string[]; // Change this to a string if type should not be an array
  category: string[]; // Change this to a string if category should not be an array
  commission: number;
  date: string;
  logo: string;
  criticalAccount: string[];
  payment: string[];
  [key: string]: string | number | string[];
}

// In your Table component file
interface TableProps {
  persons: Person[];
  handleEdit: (index: number) => void;
  handleDelete: (index: number) => void;
  handleEditSubmit: (index: number, editedPerson: Person) => void;
  handleFormSubmit: (event: React.FormEvent) => void;
}

const Table:React.FC<TableProps> =({persons, handleDelete, handleEdit, handleEditSubmit, handleFormSubmit })=> {
    const [isFilterMode] = useState(false);
    const [FilteredPersons ] = useState<Person[]>([]);
   
    // function handleDelete(index: number): void {
    //     throw new Error("Function not implemented.");
    // }
    // function handleEdit(index: number): void {
    //     throw new Error("Function not implemented.");
    // }
    const handleEditClick = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
        event.preventDefault(); // Prevent default button click behavior
        handleEdit(index);
      };
      const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
        event.preventDefault(); // Prevent default button click behavior
        handleDelete(index);
      };
      return (
        <table className="App-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phonenumber</th>
              <th>website</th>
              <th>contactname</th>
              <th>contactnumber</th>
              <th>contactemail</th>
              <th>notes</th>
              <th>type</th>
              <th>category</th>
              <th>commission</th>
              <th>date</th>
              <th>criticalaccount</th>
              <th>Payment</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(persons) ? (
              persons.map((p: Person, index: number) => (
                <tr key={index}>
                  <td>{p.name}</td>
                  <td>{p.email}</td>
                  <td>{p.phone}</td>
                  <td>{p.website}</td>
                  <td>{p.contact}</td>
                  <td>{p.number}</td>
                  <td>{p.another}</td>
                  <td>{p.notes}</td>
                  <td>{p.type}</td>
                  <td>{p.category}</td>
                  <td>{p.commission}</td>
                  <td>{p.date}</td>
                  <td>{p.criticalAccount ? "Yes" : "No"}</td>
                  <td>{p.payment}</td>
                  <td>
                    <button onClick={(event) => handleEditClick(event, index)}>Edit</button>
                    <button onClick={(event) => handleDeleteClick(event, index)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : null /* Or provide a fallback if persons is not an array */}
          </tbody>
        </table>
      );
              }

export default Table;
