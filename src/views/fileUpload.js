import React, { useState } from 'react';
import  Modal  from '../component/modal';
import Table from '../component/table'
import { Field, FieldArray, reduxForm } from 'redux-form'


const renderField = ({ input, label, type, meta: { touched, error } }) => (
    <div>
      <label>{label}</label>
      <div>
        <input {...input} type={type} placeholder={label} />
        {touched && error && <span>{error}</span>}
      </div>
    </div>
  );
  
  
function Renderfiles ({ fields,i }) {
    return (
       
  <div>
    <Field
          name={`${fields.name}.${i}.fileDocument`}
          type="file"
          component={renderField}
          label="file"
        />
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



function FileUpload({ fields ,handleSubmit, pristine, reset, submitting }) {
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
  const addFile = (e) => {
      
    e.preventDefault()
    const list = [...filesUploaded, fields]
    const newFile = {
      file: file,
      fileDocument: file.name,
      descriptioFile: descriptioFile,
      DDR: dateReception,
      apercu: ''
    }
    //list.push(newFile)
    setFilesUploaded(list)
    console.log('liiiist', fields)
    setShowForm(false)
  seti(i+1);

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
          delete={(elem) =>console.log(elem)}
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

export default reduxForm({form: "MyForm" ,  fields: ['fileDocument', 'descriptioFile','DDR' ,'apercu']})(FileUpload);
