/**
 * In the following React template, create a simple form at the top that allows the user to enter in a first name, last name, and phone number and there should be a submit button. 
 * Once the submit button is pressed, the information should be displayed in a list below (automatically sorted by last name) along with all the previous information that was entered.
 * This way the application can function as a simple phone book. 
 * When your application loads, the input fields (not the phone book list) should be prepopulated with the following values already:
 * 
    First name = Coder
    Last name = Byte
    Phone = 8885559999
 * 
 */

import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const style = {
    table: {
        borderCollapse: "collapse"
    },
    tableCell: {
        border: '1px solid gray',
        margin: 0,
        padding: '5px 10px',
        width: 'max-content',
        minWidth: '150px'
    },
    form: {
        container: {
            padding: '20px',
            border: '1px solid #F0F8FF',
            borderRadius: '15px',
            width: 'max-content',
            marginBottom: '40px'
        },
        inputs: {
            marginBottom: '5px'
        },
        submitBtn: {
            marginTop: '10px',
            padding: '10px 15px',
            border: 'none',
            backgroundColor: 'lightseagreen',
            fontSize: '14px',
            borderRadius: '5px',
            cursor: 'pointer'
        }
    }
} as const;

interface IPhoneBook {
    firstName: string,
    lastName: string,
    phone: string,
} 
function PhoneBookForm({ addEntryToPhoneBook }) {
    const [userFirstName, setUserFirstName] = useState("Coder");
    const [userLastName, setUserLastName] = useState("Byte");
    const [userPhone, setUserPhone] = useState("8885559999");

    return (
        <form onSubmit={e => { e.preventDefault() }} style={style.form.container}>
            <label>First name:</label>
            <br />
            <input
                style={style.form.inputs}
                className='userFirstname'
                name='userFirstname'
                type='text'
                value={userFirstName}
                onChange={(ev) => setUserFirstName(ev.target.value)}
            />
            <br />
            <label>Last name:</label>
            <br />
            <input
                style={style.form.inputs}
                className='userLastname'
                name='userLastname'
                type='text'
                value={userLastName}
                onChange={(ev) => setUserLastName(ev.target.value)}
            />
            <br />
            <label>Phone:</label>
            <br />
            <input
                style={style.form.inputs}
                className='userPhone'
                name='userPhone'
                type='text'
                value={userPhone}
                onChange={(ev) => setUserPhone(ev.target.value)}
            />
            <br />
            <input
                style={style.form.submitBtn}
                className='submitButton'
                type='submit'
                value='Add User'
                onClick={() => addEntryToPhoneBook({firstName: userFirstName, lastName: userLastName, phone: userPhone}) }
            />
        </form>
    )
}

interface IInformationProps {
    phoneBook: IPhoneBook[]
}


function InformationTable({ phoneBook }: IInformationProps) {
    return (
        <table style={style.table} className='informationTable'>
            <thead>
                <tr>
                    <th style={style.tableCell}>First name</th>
                    <th style={style.tableCell}>Last name</th>
                    <th style={style.tableCell}>Phone</th>
                </tr>
            </thead>
            <tbody>
                {
                    phoneBook.sort((a,b) => a.lastName.localeCompare(b.lastName)).map((value, index) => {
                        return <tr key={index}><td>{value.firstName}</td><td>{value.lastName}</td><td>{value.phone}</td></tr>
                    })
                }
            </tbody>
        </table>
    );
}

function Application(props) {
    const [phoneBook, setPhoneBook] = useState<IPhoneBook[]>([]);

    const saveToPhoneBook = (data: IPhoneBook) => {
        setPhoneBook((obj) => ([...obj, data]))
    }

    return (
        <section>
            <PhoneBookForm addEntryToPhoneBook={saveToPhoneBook} />
            <InformationTable phoneBook={phoneBook}/>
        </section>
    );
}

ReactDOM.render(
    <Application />,
    document.getElementById('test-03')
);