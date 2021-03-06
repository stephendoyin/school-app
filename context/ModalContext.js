import { createContext, useState } from "react";
import Api from "../pages/api/api";

export const ModalContext = createContext();

export const ModalProvider = (props) => {
  const [data, setData] = useState({});
  const [isOpen, setIsOpen] = useState(true);
  const [show, setShow] = useState(false);
  const [visible, isVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passedPreQuestion, setPassedPreQuestion] = useState(false);

  let handleSetData = (item) => {
    setData({ ...data, ...item });
  };

  let submitQuestions = async (dataNeeded, id) => {
    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("token");
      const response = await Api.post(
        `${Api.ENDPOINTS.url}/school/${id}/questionnaire`,
        dataNeeded,
        token
      );
      const data = response;
      setIsSubmitting(false);
      return data;
    } catch (err) {
      return err;
    }
  };

  let getRequestById = async (id) => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      const response = await Api.get(
        `${Api.ENDPOINTS.url}/school/application/${id}`,
        token
      );
      const data = response;
      setIsLoading(false);
      return data;
    } catch (err) {
      return err;
    }
  };

  const declineRequest = async (id) => {
    const token = localStorage.getItem("token");
    const response = await Api.get(
      `${Api.ENDPOINTS.url}/school/request/${id}/decline`,
      token
    );
    const { data, message } = response;
    return message;
  };

  let toggleModal = () => {
    setOpen((prev) => !prev);
  };

  const contextValue = {
    data,
    handleSetData,
    toggleModal,
    submitQuestions,
    isOpen,
    setIsOpen,
    isSubmitting,
    isLoading,
    getRequestById,
    declineRequest,
    show,
    setShow,
    passedPreQuestion,
    setPassedPreQuestion,
  };

  return (
    <ModalContext.Provider value={{ contextValue }}>
      {props.children}
    </ModalContext.Provider>
  );
};
