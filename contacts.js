const path = require('path'); 
const fs = require('fs/promises');
const { v4: uuidv4 } = require('uuid');
const ID = uuidv4();

const contactsPath = path.resolve('db/contacts.json'); 

const contactsList = async() => {
    const res = await fs.readFile(contactsPath)
    return JSON.parse(res);
};

const getContactById = async(contactId)  => {
    const contacts = await contactsList(); 
    const contact = contacts.find(item => item.id === contactId)
    return contact || null; 
};

const addContact = async ( name, email, phone) => {
    const contacts = await contactsList();
    const newContact = { id: ID, name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
};

const removeContact = async (contactId) => {
    const contacts = await contactsList();
    const index = contacts.findIndex(item => item.id === contactId)
    if (index === -1) {
        return null;
    }
    const [deletedContact] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return deletedContact; 
};

module.exports = {
    contactsList, 
    getContactById,
    addContact, 
    removeContact, 

}
 

