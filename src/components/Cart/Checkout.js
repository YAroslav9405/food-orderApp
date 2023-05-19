import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = (value) => value.trim() === '';
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
    const [formInputValidaty, setFormInputValidaty] = useState({
      name: true,
      street: true,
      city: true,
      postalCode: true
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredSteetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredpostalIsValid = isFiveChars(enteredPostal);

    setFormInputValidaty({
      name: enteredCityIsValid,
      street: enteredSteetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredpostalIsValid
    });

    const formIsValid = 
      enteredNameIsValid &&
      enteredSteetIsValid &&
      enteredpostalIsValid &&
      enteredCityIsValid;

    if(!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postaCode: enteredPostal,
      city: enteredCity
    });
  };

  const nameControlClasses = `${classes.control} ${formInputValidaty.name ? '' : classes.invalid}`;
  const streetControlClasses = `${classes.control} ${formInputValidaty.street ? '' : classes.invalid}`;
  const cityControlClasses = `${classes.control} ${formInputValidaty.city? '' : classes.invalid}`;
  const postalControlClasses = `${classes.control} ${formInputValidaty.postalCode ? '' : classes.invalid}`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef}/>
        {!formInputValidaty.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef}/>
        {!formInputValidaty.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={postalControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalInputRef}/>
        {!formInputValidaty.postalCode && <p>Please enter a valid postal code (5 characters long)!</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef}/>
        {!formInputValidaty.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;