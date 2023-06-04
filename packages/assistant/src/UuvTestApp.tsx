import React from "react";
import UuvAssistantComponent from "./UuvAssistantComponent";

const UuvTestApp: React.FC = () => {
  return (
    <>
      <main role='main'>
        <h1>Grouping Form Data with Fieldset</h1>

        <p data-testid='sentence'>The fieldset element is used to group related data in a form, and the legend element defines a caption for the</p>

        <div>
          <label id='test-list-label'>test-list</label>
          <ul aria-labelledby='test-list-label'>
            <li>a</li>
            <li>b</li>
            <li>c</li>
          </ul>
        </div>

        <form action='/'>
          <fieldset data-testid='fieldset'>
            <legend aria-label='flegend'>Personalia</legend>
            <label htmlFor='fname'>First name</label><br />
            <input type='text' id='fname' name='fname' value='John' className='fname-class' disabled /><br />
            <label htmlFor='lname'>Last name</label><br />
            <input type='text' id='lname' name='lname' value='Doe' /><br /><br />
            <input type='submit' value='Submit' />
            <input type='button' value='Reset' />
          </fieldset>
        </form>
        <input type='submit' value='Submit' />
      </main>
      <UuvAssistantComponent /></>
  );
};

export default UuvTestApp;
