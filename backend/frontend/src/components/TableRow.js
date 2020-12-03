import React, {useState} from "react";
const Row = (props) => {
  const { data, onCheck, select_all, department_list, handleChangeObjects } = props;
  const option_list = department_list.map(item => (
    <option key={item.id} value={item.id}>{item.name}</option>
    ))
  const obj = {
    id: data.id,
    department: null,
    stipend: null,
  }
  const handleDepartmentChange = (event) => {
    const value = event.target.value
    setDept(value);
    if(value !== data.department){
      obj.department = Number.parseInt(value)
      handleChangeObjects(obj);
    }
  }
  const [dept, setDept] = useState(data.department)
  return (
    <tr>
      <td>
        {select_all ? (
          <input
            type="checkbox"
            checked={select_all}
            onClick={(e) => onCheck(e, data.id)}
          />
        ) : (
          <input
            type="checkbox"
            onClick={(e) => onCheck(e, data.id)}
          />
        )}
      </td>
      <td>{data.id}</td>
      <td>{data.name}</td>
      <td>{data.email}</td>
      <td>
      <select className="custom-select mr-sm-2" id="inlineFormCustomSelect" value={dept} onChange={(e) => handleDepartmentChange(e)}>
        {option_list}
      </select>
      </td>
      <td>{data.designation_name}</td>
      <td>{data.contact_number}</td>
      <td>{data.salary}</td>
      <td>{data.joining_date}</td>
    </tr>
  );
};
// {data.department_name}
export default Row;
