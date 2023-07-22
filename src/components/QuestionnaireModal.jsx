import React, { useEffect, useState } from "react";
import useActions from "../hooks/useActions";

import { ReactComponent as CloseIcon } from "../assets/CloseIcon.svg";
import { ReactComponent as ChevronDown } from "../assets/ChevronDownLightGray.svg";
import { ReactComponent as OtherIcon } from "../assets/questionnaire/other.svg";
import { ReactComponent as CheckmarkIcon } from "../assets/CheckmarkIconGray.svg";

import { Dialog, Transition } from "@headlessui/react";
import { RadioGroup } from "@headlessui/react";

import { useDispatch, useSelector } from "react-redux";

import { getQuestions, createQuestion } from "../lib/userSlice";
import { RadioGroupOption } from "./RadioGroupOption";

const QuestionnaireModal = (props) => {

  const actions = useActions()
  const dispatch = useDispatch()
  const { questionNumber, questions, modalOpen } = useSelector(state => state)

  const [answerTextArea, setAnswerTextArea] = useState('')
  const [answers, setAnswers] = useState({})
  const [error, setError] = useState(false)
  const [otherOption, setOtherOption] = useState(false)
  const [answerRadio, setAnswerRadio] = useState('')

  const setNextPage = (key, value) => {
    const hasAnswer = answerRadio !== '' || answerTextArea !== '';
    setError(!hasAnswer);
  
    const updatedAnswers = { ...answers, [key]: value, user: localStorage.getItem('user') };
    
    const noAnswer = Object.values(updatedAnswers).some((val) => val === '');
  
    if (questionNumber + 1 === 3) {
      if (!noAnswer) {
        dispatch(createQuestion(updatedAnswers));
        actions.setModalOpen(false);
        actions.setQuestionNumber(2);
        return;
      }
    } else {
      setAnswers(updatedAnswers);
      actions.setQuestionNumber(questionNumber + 1);
      setAnswerRadio('');
      setAnswerTextArea('');
      setOtherOption(false);
    }
  };

  const dontShowModal = () => {
    localStorage.setItem('dontShowModal', true)
    actions.setModalOpen(false)
  }

  const setPrevPage = () => {
    actions.setQuestionNumber(questionNumber - 1)
    setAnswerRadio('')
    setAnswerTextArea('')
    setOtherOption(false)
  }

  useEffect(() => {
    dispatch(getQuestions())
    if(localStorage.getItem('dontShowModal')){
      actions.setModalOpen(false)
    }
  }, [])

  return (
    <Transition appear show={modalOpen} as={React.Fragment}>
      <Dialog open={modalOpen} onClose={() => actions.setModalOpen(false)} className="relative z-50">
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto custom-scroll">
          <div className="flex items-center justify-center min-h-full p-4 text-center ">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className="w-[700px] max-w-11/12 pt-8 flex flex-col gap-6 justify-around items-center overflow-hidden relative bg-app-black rounded-md"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute flex items-center justify-center w-8 transition-all duration-200 bg-black rounded-full aspect-square top-2 right-3 bg-opacity-60 hover:bg-opacity-90"
                  onClick={() => actions.setModalOpen(false)}
                >
                  <CloseIcon className="w-6 h-6" />
                </button>

                <>
                  <div className="flex flex-col items-center gap-1">
                    <h1 className="text-2xl font-bold text-center text-white">
                      {questions[questionNumber].title}
                    </h1>

                    <p className="w-9/12 text-sm text-center text-modal-description ">
                      Your feedback will help us in developing new features and
                      improving logo diffusion
                    </p>
                  </div>

                  <RadioGroup
                    className="w-[70%] grid grid-cols-2 grid-rows-2 gap-4 [&>div]:aspect-square"
                  >
                    <RadioGroupOption 
                      title={questions[questionNumber].options[0].title}
                      subtitle={questions[questionNumber].options[0].subtitle}
                      setAnswerRadio={setAnswerRadio}
                      icon={questions[questionNumber].options[0].icon}
                    />
                    <RadioGroupOption 
                      title={questions[questionNumber].options[1].title}
                      subtitle={questions[questionNumber].options[1].subtitle}
                      setAnswerRadio={setAnswerRadio}
                      icon={questions[questionNumber].options[1].icon}
                    />
                    <RadioGroupOption 
                      title={questions[questionNumber].options[2].title}
                      subtitle={questions[questionNumber].options[2].subtitle}
                      setAnswerRadio={setAnswerRadio}
                      icon={questions[questionNumber].options[2].icon}
                    />
                    
                    <RadioGroup.Option
                      className={`p-4 flex flex-col items-center justify-center gap-4 rounded-md bg-app-bg-gray ui-checked:outline-[2px] ui-checked:[outline-style:solid] ui-checked:outline-app-green transition-all duration-300`}
                      onClick={() => setOtherOption(true)}
                    >
                      <OtherIcon className="" />
                      <span className="text-base text-white">Other</span>
                      <textarea
                        rows={3}
                        className="w-11/12 text-sm text-modal-description p-2 rounded-lg !outline-none bg-app-bg-gray placeholder:text-modal-description border-solid border border-text-field-border "
                        placeholder="Please specify."
                        onChange={(e) => setAnswerTextArea(e.target.value)}
                      />
                    </RadioGroup.Option>
                  </RadioGroup>
                </>


                {error === true ? <span className="text-red-600">You should select an option before continuing</span> : null}
                <div className="flex flex-row gap-2">
                  <button
                    className="h-12 py-4 pl-3 pr-1 rounded-md group flex gap-1 items-center justify-center transition-all duration-300 [&_path]:transition-all [&_path]:duration-300 group disabled:cursor-not-allowed"
                    onClick={setPrevPage}
                    disabled={questionNumber === 0}
                  >
                    <ChevronDown
                      className={`rotate-90 [&>path]:stroke-back-btn  w-6 h-6 group-hover:[&>path]:stroke-app-green relative ml-0 mr-1 group-hover:ml-1 group-hover:mr-0 transition-all duration-300`}
                    />
                  </button>

                  <button
                    className="h-12 py-4 pl-3 pr-1 border border-solid border-carousel-button-border bg-app-bg-gray rounded-md group flex gap-1 items-center justify-center transition-all duration-300 [&_path]:transition-all [&_path]:duration-300 group disabled:cursor-not-allowed"
                    onClick={() => setNextPage(questions[questionNumber].key, otherOption ? answerTextArea : answerRadio)}
                  >
                    <span className="mr-1 text-carousel-next-count">
                      {questionNumber + 1} / {questions.length}
                    </span>

                    <span className="text-white group-disabled:text-carousel-next-count">
                      Next
                    </span>

                    <ChevronDown
                      className={`-rotate-90 [&>path]:stroke-white group-hover:[&>path]:stroke-app-green relative ml-0 mr-1 group-hover:ml-1 group-hover:mr-0 transition-all duration-300`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-center w-full p-4 bg-app-bg-gray ">
                  <div className="flex flex-row">
                    <input
                      type="checkbox"
                      id="dont-show"
                      className="appearance-none h-[17px] w-[17px]  rounded-[4px] border-[1.5px] border-solid border-checkmark-border transition-all duration-200 peer"
                      onClick={dontShowModal}
                    />
                    <CheckmarkIcon className="opacity-0 peer-checked:opacity-100 [&>path]:stroke-checkmark-check absolute rounded-full pointer-events-none my-1 mx-1 transition-all duration-200 w-[9px] h-[9px]" />
                    <label
                      htmlFor="dont-show"
                      className="flex flex-col justify-center px-2 text-xs select-none text-title-white"
                    >
                      Don't show this again
                    </label>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default QuestionnaireModal;
