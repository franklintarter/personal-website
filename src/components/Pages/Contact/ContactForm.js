import React, { useState } from "react";

// import addToMailchimp from "gatsby-plugin-mailchimp";
import { useField, useForm } from "react-final-form-hooks";
import CheckCircle from "../../../img/svg/ui/check-circle.svg";
import { TextInput, Button, TextArea } from "../../UI";

const validateEmail = val => {
  const re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  const res = re.test(val);
  if (!res) {
    return "Valid Email Required";
  }
  return undefined;
};

const MailSignUp = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = values => {
    setIsLoading(true);
    console.log(values);

    setTimeout(() => {
      setSuccess(true);
      // setError(true);
      // setErrorMsg("Something went wrong.");
      setIsLoading(false);
    }, 700);

    // Add to mailchimp or Slack/Zap action here!

    // addToMailchimp(values.email)
    //   .then(data => {
    //     if (data.result === "success") {
    //       console.log(data);
    //       setSuccess(true);
    //       setError(false);
    //       setIsLoading(false);
    //     } else {
    //       console.log(data);
    //       setError(true);
    //       setIsLoading(false);
    //       setErrorMsg(data.msg);
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     setError(true);
    //     setIsLoading(false);
    //   });
  };

  const { form, handleSubmit } = useForm({
    onSubmit,
    initialValues: {
      email: ""
    }
  });
  const email = useField("email", form, validateEmail);
  const name = useField("name", form);
  const comment = useField("comment", form);
  const isValid = !email.meta.touched || email.meta.valid;

  return (
    <div>
      <h3 className="font-semibold mb-3 text-blue4">
        Sign Up for New Posts &amp; Updates
      </h3>
      {success ? (
        <div className="p-4 mt-4 bg-gray-100 flex">
          <span className="text-teal-400">
            <CheckCircle className="fill-current w-6 mr-4" />
          </span>
          <span className="pt-px">Thank you for subscribing!</span>
        </div>
      ) : (
        <div>
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <TextInput
              className="mb-8"
              onBlur={email.input.onBlur}
              onFocus={email.input.onFocus}
              onChange={email.input.onChange}
              label="Your Email"
              isValid={isValid}
              value={email.input.value}
              validationMessage="Please enter a valid email"
            />
            <TextInput
              className="mb-8"
              onBlur={name.input.onBlur}
              onFocus={name.input.onFocus}
              onChange={name.input.onChange}
              value={name.input.value}
              label="Name (optional)"
            />
            <TextArea
              onBlur={comment.input.onBlur}
              onFocus={comment.input.onFocus}
              onChange={comment.input.onChange}
              value={comment.input.value}
              label="Comment (optional)"
            />
            <p className="text-xs text-blue4 pt-5 italic mb-5">
              We will send you an occasional update, but will respect your
              inbox.
            </p>
            <Button type="submit" loading={isLoading}>
              Sign Up
            </Button>
          </form>
        </div>
      )}
      {error && (
        <div
          className="text-xs text-red-700 tracking-wider pt-4"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: errorMsg }}
        />
      )}
    </div>
  );
};

export default MailSignUp;
