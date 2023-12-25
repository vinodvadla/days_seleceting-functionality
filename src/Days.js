import React from "react";
import { Formik, FieldArray, Field, ErrorMessage, Form } from "formik";

const DaySelector = ({ days, selectedDays, onSelectDay, disabledDays }) => {
    const handleDayClick = (day) => {
        if (selectedDays.includes(day)) {
            const updatedDays = selectedDays.filter(
                (selectedDay) => selectedDay !== day
            );
            onSelectDay(updatedDays);
        } else {
            onSelectDay([...selectedDays, day]);
        }
    };

    const buttonStyle = {
        margin: "5px",
        padding: "8px 12px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        cursor: "pointer",
    };

    const selectedButtonStyle = {
        ...buttonStyle,
        backgroundColor: "lightblue",
    };

    const disabledButtonStyle = {
        ...buttonStyle,
        opacity: "0.5",
        cursor: "not-allowed",
    };

    return (
        <div>
            {days.map((day, index) => (
                <button
                    key={index}
                    onClick={() => handleDayClick(day)}
                    disabled={disabledDays.includes(day) && !selectedDays.includes(day)}
                    style={
                        selectedDays.includes(day)
                            ? selectedButtonStyle
                            : disabledDays.includes(day)
                                ? disabledButtonStyle
                                : buttonStyle
                    }
                >
                    {day}
                </button>
            ))}
        </div>
    );
};

const DynamicFormWithSelectors = () => {
    const fieldStyle = {
        margin: "5px",
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "4px",
    };

    const addButtonStyle = {
        margin: "5px",
        padding: "8px 12px",
        backgroundColor: "green",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    };

    const removeButtonStyle = {
        margin: "5px",
        padding: "8px 12px",
        backgroundColor: "red",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    };

    return (
        <div>
            <Formik
                initialValues={{
                    variablePrices: [{ vp: [{ name: "", email: "", phone: "" }], days: [] }],
                }}
                onSubmit={(values) => {
                    console.log("Submitted values:", values);
                }}
            >
                
                {({ values, setFieldValue }) => (
                    <Form>
                        <FieldArray name="variablePrices">
                            {({ push, remove }) => (
                                <div>
                                    {values.variablePrices.map((vp, index) => {
                                        const selectedDays = vp.days || [];
                                        const disabledDays = values.variablePrices
                                            .filter((_, i) => i !== index)
                                            .flatMap((s) => s.days || []);

                                        return (
                                            <div key={index}>
                                                <Field name={`variablePrices[${index}].days`}>
                                                    {({ field }) => (
                                                        <DaySelector
                                                            days={[
                                                                "Monday",
                                                                "Tuesday",
                                                                "Wednesday",
                                                                "Thursday",
                                                                "Friday",
                                                                "Saturday",
                                                                "Sunday",
                                                            ]}
                                                            selectedDays={selectedDays}
                                                            onSelectDay={(newSelectedDays) => {
                                                                setFieldValue(
                                                                    `variablePrices[${index}].days`,
                                                                    newSelectedDays
                                                                );
                                                            }}
                                                            disabledDays={disabledDays}
                                                        />
                                                    )}
                                                </Field>
                                                <FieldArray name={`variablePrices[${index}].vp`} key={index}>
                                                    {({ push: pushInner, remove: removeInner }) => (
                                                        <div>
                                                            {values.variablePrices[index].vp.map((ele, i) => (
                                                                <div key={i}>
                                                                    <Field
                                                                        name={`variablePrices[${index}].vp[${i}].name`}
                                                                        placeholder="Name"
                                                                        style={fieldStyle}
                                                                    />
                                                                    <Field
                                                                        name={`variablePrices[${index}].vp[${i}].email`}
                                                                        type="email"
                                                                        placeholder="Email"
                                                                        style={fieldStyle}
                                                                    />
                                                                    <Field
                                                                        name={`variablePrices[${index}].vp[${i}].phone`}
                                                                        type="tel"
                                                                        placeholder="Phone"
                                                                        style={fieldStyle}
                                                                    />
                                                                    {i > 0 ? (
                                                                        <button type="button" onClick={() => removeInner(i)}>
                                                                            -
                                                                        </button>
                                                                    ) : (
                                                                        <button
                                                                            type="button"
                                                                            onClick={() =>
                                                                                pushInner({ name: "", email: "", phone: "" })
                                                                            }
                                                                        >
                                                                            +
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </FieldArray>



                                                {
                                                    index !== values.variablePrices.length - 1 ? (
                                                        <>
                                                            <button
                                                                type="button"
                                                                onClick={() => remove(index)}
                                                                style={removeButtonStyle}
                                                            >
                                                                remove
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    push({
                                                                        vp: [{ name: "", email: "", phone: "" }],
                                                                        days: [],
                                                                    })
                                                                }
                                                                style={addButtonStyle}
                                                            >
                                                                Add
                                                            </button>
                                                            <button
                                                                type="button"
                                                                onClick={() => remove(index)}
                                                                style={removeButtonStyle}
                                                            >
                                                                remove
                                                            </button></>
                                                    )
                                                }
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </FieldArray>
                        <ErrorMessage name="selectors" component="div" />
                        <button type="submit">Submit</button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default DynamicFormWithSelectors;
