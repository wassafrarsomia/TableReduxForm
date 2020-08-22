import React, { useState } from 'react';
import  Modal  from '../component/modal';
import Table from '../component/table'
import {connect} from 'react-redux'
import { Field, FieldArray, reduxForm, getFormValues } from 'redux-form'


const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
      <label>{label}</label>
      <div>
        <input {...input} type={type} placeholder={label} />
        {touched && error && <span>{error}</span>}
      </div>
    </div>
  );
  function CustomFileInput  ( field, {input}) {
    const [file, setFile] = useState([])
    function onChangeFile(e) {
      setFile(e.target.files[0])
    }
    delete field.input.value; // <-- just delete the value property
    return <input {...input} type="file" id="file" {...field.input.value}   onChange={onChangeFile}/>;
  };

  
function Renderfiles ({ fields,i }) {
    return (
       
  <div>
        <Field 
            name={`${fields.name}.${i}.fileDocument`}
            type="file"
            component={CustomFileInput}/>
        <Field
          name={`${fields.name}.${i}.descriptioFile`}
          type="text"
          component={renderField}
          label="Description"
        />
         <Field
          name={`${fields.name}.${i}.DDR`}
          type="date"
          component={renderField}
          label="date de reception"
        />
  </div>
	);
};



function FileUpload({ fields ,handleSubmit, pristine, reset, submitting, values }) {
  const [showForm, setShowForm] = useState(false);
  const [filesUploaded, setFilesUploaded] = useState([]);
  const [file, setFile] = useState([])
  const [descriptioFile, setDescriptionFile] = useState()
  const [dateReception, setDateReception] = useState()
  const [i, seti] = useState(0)
  const fileColumns = [
    { title: 'Fichier', property: 'fileDocument' },
    { title: 'Description', property: 'descriptioFile' },
    { title: 'Date de réception', property: 'DDR' },
    { title: 'Aperçu', property: 'apercu' },
  ]
  console.log('values' , values)
  const addFile = (e) => {
  setFilesUploaded(values.files)
  seti(i+1);
  setShowForm(false)
  };
  const modeAddFile = () => {
    setShowForm(true);}

  return (
    <>
        <button
          variant="contained"
          size="small"
          color="primary"
          onClick={modeAddFile}
        >Add file</button>

        <Table
          columns={fileColumns}
          data={filesUploaded}
          buttons
          edit={elem => console.log(elem)}
          delete={(row) =>{const newData = filesUploaded.filter(elem => elem != row)
            setFilesUploaded(newData)}}
          pageSize={0}
        />
        <Modal
          open={showForm}
          setOpen={setShowForm}
          setEdit={false}
          TitleIcon={""}
          title={"Détails du document"}
          header={""}
          taille="md"
        >
      <form onSubmit={handleSubmit}>
      <FieldArray name="files" i={i} component={Renderfiles} />
      <div>
        <button type="submit" disabled={submitting} onClick={addFile}>
          Submit
        </button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
        </Modal>
  
    </>
  );
}

const rdxfrm = reduxForm({form: "MyForm" })

const cnct = connect(state =>( {
  values: getFormValues('MyForm')(state)
}))(FileUpload)

export default rdxfrm(cnct)

