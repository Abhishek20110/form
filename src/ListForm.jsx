import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';



const ListForm = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      
      try {
        const response = await axios.get('http://localhost:8080/list-contacts');
        
        setData(response.data);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    fetchData();
  }, []);


  const handleEdit=(id)=>{
    // console.log(id)
    navigate(`/edit/${id}`);

  }

  const handleDelete = async (id) => {
    try {
    await axios.put(`http://localhost:8080/delete-contact/${id}`);
      setData(data.filter(item => item._id !== id));
    } catch (error) {
      console.error('Failed to delete', error);
    }
  };

  const columns = [

    { name: 'Sl no', selector: (row,index) => index+1  },
    { name: 'Name', selector: row => row.name},
    { name: 'Email', selector: row => row.email  },
    { name: 'Mobile', selector: row => row.mobile  },
    { name: 'Address', selector: row => row.address },
    { name: 'Actions', cell: row => (
      <div>
        <button onClick={() => handleEdit(row._id)} style={{ marginRight: '5px' }}>
          Edit
        </button>
        <button onClick={() => handleDelete(row._id)} style={{ color: 'red' }}>
          Delete
        </button>
      </div>
    ) },
  ];

  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.email.toLowerCase().includes(search.toLowerCase()) ||
    item.mobile.toLowerCase().includes(search.toLowerCase()) ||
    item.address.toLowerCase().includes(search.toLowerCase())
  );



  return (
    <div className="container mt-5">
      <h2>Contact List</h2>
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        subHeader
        subHeaderComponent={
          <input
            type="text"
            placeholder="Search"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ marginBottom: '1rem' }}
          />
        }
      />
    </div>
  );
};

export default ListForm;
