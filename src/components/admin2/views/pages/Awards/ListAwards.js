import React, { useEffect, useState } from "react";
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../../components/index';
import '../../../../admin2/scss/style.scss';
import '../../../../admin2/scss/examples.scss';
import '../../../../admin2/scss/custom.css';
import DataTable from 'react-data-table-component';
import { CBreadcrumb, CBreadcrumbItem, CButton, CBadge } from '@coreui/react';
import { Link } from 'react-router-dom';
import { cilPlus, cilPencil, cilTrash } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { toast } from 'react-toastify';
import api from '../../../../../api/axiosInstance';
import API_PATH from '../../../../../api/apiPath';


export default function AwardsList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Handle delete
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this award?")) {
            api
                .delete(`/awards-data/delete-award/${id}`)
                .then((response) => {
                    if (response.data.success) {
                        toast.success('Award deleted successfully');
                        setData(prev => prev.filter(item => item.id !== id));
                    } else {
                        toast.error(response.data.message || 'Failed to delete award');
                    }
                })
                .catch((err) => {
                    console.error(err);
                    toast.error('Something went wrong!');
                });
        }
    };

    // Define table columns
    const columns = [
        {
            name: "S.No.",
            selector: (row, index) => index + 1,
            width: "80px",
        },
        {
            name: "Sub-heading",
            selector: row => row.sub_heading,
            sortable: true,
        },
        {
            name: "Banner Image",
            cell: (row) =>
                row.banner_image ? (
                    <img
                        src={`${API_PATH}/uploads/awards/${row.banner_image}`}
                        alt="Banner"
                        style={{
                            width: "70px",
                            height: "45px",
                            objectFit: "cover",
                            borderRadius: "6px",
                        }}
                    />
                ) : (
                    <span>No Image</span>
                ),
            width: "130px",
        },
        {
            name: "Spotlight Awards",
            cell: (row) => (
                <span>{row.spotlight?.length || 0} items</span>
            ),
            sortable: false,
        },
        {
            name: "All Awards",
            cell: (row) => (
                <span>{row.all_awards?.length || 0} items</span>
            ),
            sortable: false,
        },
        {
            name: "Status",
            cell: (row) => (
                <CBadge color={row.status === "1" ? "success" : "danger"}>
                    {row.status === "1" ? "Active" : "Inactive"}
                </CBadge>
            ),
            width: "100px",
        },
        {
            name: "Action",
            cell: (row) => (
                <div className="d-flex gap-2">
                    <Link to="/admin/edit-awards" state={{ id: row.id }}>
                        <CButton color="primary" variant="outline" size="sm">
                            <CIcon icon={cilPencil} />
                        </CButton>
                    </Link>
                    <CButton
                        color="danger"
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(row.id)}
                    >
                        <CIcon icon={cilTrash} />
                    </CButton>
                </div>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    // Fetch Awards
    useEffect(() => {
        const fetchAwards = async () => {
            try {
                const response = await api.get("/awards-data/get-awards");
                if (response.data.success && response.data.awards) {
                    setData(response.data.awards);
                } else {
                    console.warn("Unexpected API response:", response.data);
                }
            } catch (error) {
                console.error("Error fetching awards:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAwards();
    }, []);

    return (
        <div>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1 p-3">
                    <div className='row bg-white mx-1 mb-3 py-3 shadow-sm'>
                        <div className='col-lg-12 d-flex align-items-center'>
                            <CBreadcrumb className="mb-0">
                                <CBreadcrumbItem>
                                    <Link to="/admin/dashboard" className='text-decoration-none'>
                                        Home
                                    </Link>/Awards
                                </CBreadcrumbItem>
                            </CBreadcrumb>
                        </div>
                    </div>

                    <div className='row mb-3'>
                        <div className='col-lg-6 d-flex align-items-center'>
                            <CBreadcrumb className="mx-3 mb-0">
                                <CBreadcrumbItem>Awards</CBreadcrumbItem>
                            </CBreadcrumb>
                        </div>
                        <div className='col-lg-6 d-flex justify-content-end'>
                            <Link to="/admin/add-awards" className='text-decoration-none'>
                                <CButton className='custom-button text-white align-items-center d-flex gap-2'>
                                    <CIcon icon={cilPlus} size="lg" />
                                    Add Awards
                                </CButton>
                            </Link>
                        </div>
                    </div>

                    <DataTable
                        columns={columns}
                        data={data}
                        pagination
                        progressPending={loading}
                    />
                </div>
                <AppFooter />
            </div>
        </div>
    );
}
