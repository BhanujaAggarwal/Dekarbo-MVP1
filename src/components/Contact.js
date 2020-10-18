import React,{useState} from 'react';
import './contact.css';
import {db} from '../firebase'

const Contact = () => {

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [message,setMessage] = useState("");

    const [loader,setLoader] = useState(false);

    const [os,setOs] = useState("");
    const [gen,setGen] = useState("");

    const [platformValue, plaftormInputProps] = useRadioButtons("platform");
    const [genderValue, genderInputProps] = useRadioButtons("gender");

    const [fields, setFields] = useState([{ value: null }]);

    function handleChange(i, event) {
        const values = [...fields];
        values[i].value = event.target.value;
        setFields(values);
      }
    
      function handleAdd() {
        const values = [...fields];
        values.push({ value: null });
        setFields(values);
      }
    
      function handleRemove(i) {
        const values = [...fields];
        values.splice(i, 1);
        setFields(values);
      }

    
    const handleSubmit = (e) => {
        e.preventDefault();

        setLoader(true);

        db.collection('contacts').add({
            Machines_HoursOfUsage:fields,
            Number_of_employees :os,
            Revenue_in_Millions:gen,
            name:name,
            email:email,
            message:message
        })
        .then(() => {
            alert("Form has been submitted :)");
            setLoader(false);
        })
        .catch(error => {
            alert(error.message);
            setLoader(false);
        });
        setOs("");
        setGen("");
        setName("");
        setEmail("");
        setMessage("");
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h1>Data form</h1>

            <p>How many employees do you have in your company?</p><br></br>

        <fieldset
            onChange={(e) => setOs(e.target.value)}>
          
          <input
            value="<250"
            checked={platformValue === "<250"}
            {...plaftormInputProps}
            
          />
          ＜ 250
          <br></br>
          
          <input
            value=">=250"
            checked={platformValue === ">=250"}
            {...plaftormInputProps}
          />
          ＞= 250
        </fieldset>

        <br></br><p>How much revenue have you earned last year?</p><br></br>

        <fieldset
             onChange={(e) => setGen(e.target.value)}>
          <input
            value="<50"
            checked={genderValue === "<50"}
            {...genderInputProps}
          />＜50 Million
          <br></br>
          <input
            value=">=50"
            checked={genderValue === ">=50"}
            {...genderInputProps}
          />＞=50 Million
        </fieldset>

        <br></br><p>What are the machines and devices you use?</p>
        <p>Please fill in the details</p>
        <p>Name/Model/Serial number - Working hours</p>
        <p style={{fontSize:15}}>*Only in this format</p>


        <br></br>
        {fields.map((field, idx) => {
        return (
          <div key={`${field}-${idx}`}>
            <input style={{padding: 15, fontSize: 16}}
              type="text"
              placeholder="Name - Working Hours"
              onChange={e => handleChange(idx, e)}
            />
            <button style={{padding: 15, fontSize: 16}} type="button" onClick={() => handleRemove(idx)}>
              DELETE
            </button>
          </div>
        );
      })}

<button style={{padding: 15, fontSize: 16, backgroundColor: "#000000"}}  type="button" onClick={() => handleAdd()}>
        Click to add
        </button><br></br>


        <lable>Please write your Email</lable>
            <input 
                placeholder="Name" 
                value = {name}
                onChange={(e) => setName(e.target.value)}
            />

        <lable>Please write your Name</lable>
            <input 
                placeholder="Email" 
                value = {email}
                onChange={(e) => setEmail(e.target.value)}
            />

        <lable>Is there anything you want to tell us?</lable>
            <textarea 
                placeholder="Message"
                value = {message}
                onChange={(e) => setMessage(e.target.value)}>
            </textarea>

            <button type="submit" style={{background : loader ? "#ccc" : "rgb(2,2,110)"}}>Submit</button>

        </form>
    )
}

function useRadioButtons(name) {
    const [value, setState] = useState(null);
  
    const handleChange = e => {
      setState(e.target.value);
    };
  
    const inputProps = {
      name,
      type: "radio",
      onChange: handleChange
    };
  
    return [value, inputProps];
  }

export default Contact
