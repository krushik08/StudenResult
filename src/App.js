import React, { useEffect, useState } from "react";
import Table from "./Component/Display/Table";
import Form from "./Component/Form/Form";

function App() {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [maths, setMaths] = useState(0);
  const [english, setEnglish] = useState(0);
  const [science, setScience] = useState(0);

  const [total, setTotal] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [result, setResult] = useState(0);

  const [savedData, setSavedData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [storedMainData, setStoredMainData] = useState([]);
  const [searchString, setSearchString] = useState("");

  const getTotal = (maths, english, science, doSet = true) => {
    const ttlMarks = parseInt(maths) + parseInt(english) + parseInt(science);
    if (doSet) setTotal(ttlMarks);
    return ttlMarks;
  };

  const getPercentage = (maths, english, science, doSet = true) => {
    const ttlMarks = getTotal(maths, english, science, false);
    const percentage = (ttlMarks * 100) / 300;
    if (doSet) setPercentage(percentage);
    return percentage;
  };

  const getResult = (maths, english, science, doSet, id, name) => {
    const ttl = parseInt(maths) + parseInt(english) + parseInt(science);
    const totalPercentage = (ttl * 100) / 300;
    var resultString = "";

    if (
      totalPercentage >= 35 &&
      maths >= 35 &&
      english >= 35 &&
      science >= 35
    ) {
      setResult("pass");
      resultString = "pass";
    } else {
      setResult("fail");
      resultString = "fail";
    }
    if (doSet) setResult(resultString);

    return resultString;
  };

  const validateFields = () => {
    var validation = "";

    if (id == 0 || id == "") {
      validation = "Please enter your valid Id.";
    } else if (name == "") {
      validation = "Please enter your valid name.";
    } else if (
      maths == 0 ||
      maths == "" ||
      parseInt(maths) < 0 ||
      parseInt(maths) > 100
    ) {
      validation = "Please enter your valid marks of maths.";
    } else if (
      english == 0 ||
      english == "" ||
      parseInt(english) < 0 ||
      parseInt(english) > 100
    ) {
      validation = "Please enter your valid marks of english.";
    } else if (
      science == 0 ||
      science == "" ||
      parseInt(science) < 0 ||
      parseInt(science) > 100
    ) {
      validation = "Please enter your valid marks of science.";
    }

    return validation;
  };

  const saveResult = () => {
    const validation = validateFields();
    if (validation == "") {
      // check valid fields
      const isRecordsExist = savedData.some((e) => e.id == id);
      if (isEditing) {
        if (isRecordsExist) {
          const dTotal = getTotal(maths, english, science);
          const dPercentage = getPercentage(maths, english, science);
          const dResult = getResult(maths, english, science);

          var index = 0;

          for (const record of storedMainData) {
            console.log(record.id);
            if (record.id == id) {
              const obj = storedMainData;
              obj.splice(index, 1, {
                id: id,
                name: name,
                maths: maths,
                english: english,
                science: science,
                total: dTotal,
                percentage: dPercentage,
                result: dResult,
              });

              setStoredMainData(obj);
              setSavedData(obj);
              break;
            }
            index++;
          }

          // console.log(obj);
        } else {
          alert("Record not exists !");
        }
        setIsEditing(false);
      } else {
        if (!isRecordsExist) {
          const dTotal = getTotal(maths, english, science);
          const dPercentage = getPercentage(maths, english, science);
          const dResult = getResult(maths, english, science);

          setStoredMainData([
            ...storedMainData,
            {
              id: id,
              name: name,
              maths: maths,
              english: english,
              science: science,
              total: dTotal,
              percentage: dPercentage,
              result: dResult,
            },
          ]);
          setSavedData([
            ...savedData,
            {
              id: id,
              name: name,
              maths: maths,
              english: english,
              science: science,
              total: dTotal,
              percentage: dPercentage,
              result: dResult,
            },
          ]);
          console.log(savedData);
        } else {
          alert("Record alreadt exists with the Enrollment Id");
        }
      }
    } else {
      alert(validation);
    }
  };

  const deleteStudent = (record) => {
    const Index = storedMainData.indexOf(record);
    storedMainData.splice(Index, 1);
    setStoredMainData([...storedMainData]);

    // setSavedData(savedData.filter((record) => record.id != id));
    // setStoredMainData(storedMainData.filter((record) => record.id != id));
  };

  const editStudentRecord = (id) => {
    setIsEditing(true);
    var studentObj = {};
    storedMainData.forEach((student) => {
      if (student.id == id) {
        studentObj = student;
      }
    });
    setId(studentObj.id);
    setName(studentObj.name);
    setMaths(studentObj.maths);
    setEnglish(studentObj.english);
    setScience(studentObj.science);
    setTotal(studentObj.total);
    setPercentage(studentObj.percentage);
    setResult(studentObj.result);
  };

  useEffect(() => {
    setIsSearching(true);
    var _searchString = new RegExp(searchString + "", "i");
    const data = storedMainData.filter(
      (record) => record.name.search(_searchString) !== -1
    );

    if (data.length <= 0) {
      setIsSearching(false);
    }
    setSavedData(data);
  }, [searchString, storedMainData]);

  return (
    <>
      <Form
        id={id}
        name={name}
        maths={maths}
        english={english}
        science={science}
        setId={setId}
        setName={setName}
        setMaths={setMaths}
        setEnglish={setEnglish}
        setScience={setScience}
        saveResult={saveResult}
      />

      <Table
        savedData={savedData}
        delete={deleteStudent}
        filter={setSearchString}
        edit={editStudentRecord}
      />
    </>
  );
}

export default App;
