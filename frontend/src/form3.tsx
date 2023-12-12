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
 criticalAccount:string[];
  payment : string[];
  [key: string]: string | number  | string[] ;
}
interface FilterProps {
    nameFilter :string;
    setNameFilter :React.Dispatch<React.SetStateAction<string>>;
    phoneFilter : string;
    setPhoneFilter : React.Dispatch<React.SetStateAction<string>>;
    typeFilter : string;
    setTypeFilter : React.Dispatch<React.SetStateAction<string>>;
    paymentFilter : string;
    setPaymentFilter : React.Dispatch<React.SetStateAction<string>>;
    ApplyFilter :(event: React.FormEvent)=> void;
    Backtoform : (event : React.FormEvent)=> void;
    isFilterMode : boolean;
    FilteredPersons: Person[];
}
const Filter: React.FC<FilterProps> = ({
    nameFilter,
    setNameFilter,
    phoneFilter,
    setPhoneFilter,
    typeFilter,
    setTypeFilter,
    paymentFilter,
    setPaymentFilter,
    ApplyFilter,
    Backtoform: Backtoform,
    FilteredPersons,
  }) =>{
  const handleApplyFilter = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission behavior
    ApplyFilter(event);
  };
  const handleBacktoform = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent the default form submission behavior
    Backtoform(event);
  };
   return (
<div>
      {/* Render the filtered persons */}
      <h2>Filtered Persons</h2>
      <ul>
        {FilteredPersons.map((person, index) => (
          <li key={index}>
            { "NAME:"+person.name} ,
            {"EMAIL:"+person.email} ,
            {"PHONENUMBER:"+person.phone}
          </li>
        ))}
      </ul>
<form id="filterForm">
        {/* Add filter input elements */}
        {/* <input
          type="text"
          id="nameFilter"
          name="nameFilter"
          value={nameFilter}
          onChange={(event) => setNameFilter(event.target.value)}
        />
        <label htmlFor="phoneFilter">Filter by Phone Number:</label>
        <input
          type="text"
          id="phoneFilter"
          name="phoneFilter"
          value={phoneFilter}
          onChange={(event) => setPhoneFilter(event.target.value)}
        /><label htmlFor="nameFilter">Filter by Name:</label>
         */}
        <label htmlFor="typeFilter">Filter by Type of Business:</label>
        <select
          id="typeFilter"
          name="typeFilter"
          value={typeFilter}
          onChange={(event) => setTypeFilter(event.target.value)}
        >
          <option value="">All</option>
          <option value="small business">Small Business</option>
          <option value="Entreprise">Entreprise</option>
          <option value="Entreprenuer">Entreprenuer</option>
        </select>
        <label htmlFor="paymentFilter">Filter by Payment:</label>
        <select
          id="paymentFilter"
          name="paymentFilter"
          value={paymentFilter}
          onChange={(event) => setPaymentFilter(event.target.value)}
        >
          <option value="">All</option>
          <option value="cash">Cash on Payment</option>
          <option value="upi">UPI</option>
          <option value="card">Card on payment</option>
        </select>
        <button   onClick={handleApplyFilter}>Apply Filter</button>
        <button onClick={handleBacktoform}>Back to Form</button>
      </form>
      </div>
    )
}
export default Filter;