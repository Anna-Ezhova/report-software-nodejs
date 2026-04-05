"use client";
import { ArrowBigRight, Check, X } from "lucide-react";
import React from "react";
import Select from "react-select";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { checklistObject } from "../auto-report/AlarmChecklistForm";
import { TextField } from "@mui/material";

interface CheckList {
  item: checklistObject;
  onToggleCompleted: Function;
  disabled: boolean;
  categoryChange: Function;
  levelChange: Function;
}

const ChecklistItem = ({
  item,
  onToggleCompleted,
  disabled,
  levelChange,
  categoryChange,
}: CheckList) => {
  const options = [
    { value: "LOW", label: "LOW" },
    { value: "MEDIUM", label: "MEDIUM" },
    { value: "HIGH", label: "HIGH" },
  ];

  const completedStyle = "bg-green-200 hover:bg-green-300 scale-95";
  const notcompletedStyle = "bg-slate-100 hover:bg-slate-200";
  const notcompletedStyleList = "bg-slate-200 hover:bg-slate-300";

  const buttonActive = "bg-slate-300 hover:bg-slate-200";
  const buttonNotactive = "bg-green-200 hover:bg-green-100";

  const completedList = "hidden";

  const subtasks = item.tasks;

  return (
    <>
      <li
        className={`${item.completed ? completedStyle : notcompletedStyle} min-h-28 flex flex-row justify-around items-center text-xl gap-4 px-4 py-2 cursor-pointer rounded-md shadow-md my-2 font-medium`}
      >
        <div className="bg-slate-500 text-asoftnet-50 w-8 h-8 p-1 rounded-full text-center shadow-md">
          {item.id}
        </div>
        <div>{item.groupName}</div>{" "}
        <div>
          {item.completed ? (
            <Check className="text-green-700" />
          ) : (
            <X className="text-red-800" />
          )}
        </div>
      </li>

      <li className={`${disabled ? completedList : null}`}>
        <ul>
          {subtasks.length != 0 ? (
            subtasks.map((task) => {
              if (task.type === "simple_task") {
                return (
                  <li
                    key={task.id}
                    className={`${task.completed ? completedStyle : notcompletedStyleList} min-h-10 flex flex-row justify-around items-center text-xl gap-4 px-4 py-2 cursor-pointer rounded-md shadow-md my-2 font-medium`}
                    onClick={() => onToggleCompleted(item.id, task.id)}
                  >
                    {" "}
                    {task.taskName}
                  </li>
                );
              } else if (task.type === "question") {
                return (
                  <li
                    key={task.id}
                    className={`${task.completed ? completedStyle : notcompletedStyleList} min-h-10 flex flex-row justify-around items-center text-xl gap-4 px-4 py-2 cursor-pointer rounded-md shadow-md my-2 font-medium`}
                  >
                    {task.taskName}

                    <div className="form-check">
                      <label>
                        <input
                          type="radio"
                          name={`question_${task.id}`}
                          value="yes"
                          onChange={() =>
                            onToggleCompleted(item.id, task.id, "yes")
                          }
                          className="form-check-input size-4 mr-1"
                        />
                        Ja
                      </label>
                    </div>

                    <div className="form-check">
                      <label>
                        <input
                          type="radio"
                          name={`question_${task.id}`}
                          value="no"
                          onChange={() =>
                            onToggleCompleted(item.id, task.id, "no")
                          }
                          className="form-check-input size-4 mr-1"
                        />
                        Nein
                      </label>
                    </div>
                  </li>
                );
              } else if (task.type === "input") {
                return (
                  <li
                    key={task.id}
                    className={`${task.completed ? completedStyle : notcompletedStyleList} min-h-10 flex flex-row justify-around items-center text-xl gap-4 px-4 py-2 cursor-pointer rounded-md shadow-md my-2 font-medium self-center`}
                  >
                    <div>
                      <TextField
                        multiline
                        id="outlined-basic"
                        label={task.taskName}
                        variant="outlined"
                        name={`input_${task.id}`}
                        onChange={(e) => {
                          categoryChange(e.target.value);
                        }}
                      />

                      <button
                        className={`${task.completed ? buttonNotactive : buttonActive} ml-1 mt-2 rounded `}
                        onClick={() => {
                          onToggleCompleted(item.id, task.id);
                        }}
                      >
                        {" "}
                        {task.completed ? (
                          <Check className="text-green-700" />
                        ) : (
                          "Speichern"
                        )}{" "}
                      </button>
                    </div>
                  </li>
                );
              } else if (task.type === "select") {
                return (
                  <li
                    key={task.id}
                    className={`${task.completed ? completedStyle : notcompletedStyleList} min-h-10 flex flex-row justify-around items-center text-xl gap-4 px-4 py-2 cursor-pointer rounded-md shadow-md my-2 font-medium`}
                  >
                    <select
                      onChange={(e) => {
                        levelChange(e.target.value);

                        onToggleCompleted(item.id, task.id);
                      }}
                    >
                      <option value="">{task.taskName}</option>
                      <option value="LOW">LOW</option>
                      <option value="MEDIUM">MEDIUM</option>
                      <option value="HIGH">HIGH</option>
                    </select>
                  </li>
                );
              }
            })
          ) : (
            <h2 className="text-2xl font-bold text-asoftnet-900">Loading...</h2>
          )}
        </ul>
      </li>
    </>
  );
};

export default ChecklistItem;
