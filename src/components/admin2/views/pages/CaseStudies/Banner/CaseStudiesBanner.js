import React, { useEffect, useState } from "react";
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../../../../components/index'
import '../../../../../admin2/scss/style.scss'
import '../../../../../admin2/scss/examples.scss'
import '../../../../../admin2/scss/custom.css'
import DataTable from 'react-data-table-component';
import { CBreadcrumb, CBreadcrumbItem, CButton, CBadge } from '@coreui/react'
import { Link } from 'react-router-dom'
import { cilPlus, cilPencil, cilTrash } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { toast } from 'react-toastify';
import api from '../../../../../../api/axiosInstance';
import API_PATH from '../../../../../../api/apiPath';

export default function CareerList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Delete career
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this career?")) {
            api
                .delete(`/case-studies-banner/deletecase-studies-banner/${id}`)
                .then((response) => {
                    toast.success('Career deleted successfully');
                    setData(prev => prev.filter(career => career.id !== id));
                })
                .catch((err) => {
                    console.error(err);
                    toast.error('Something went wrong while deleting!');
                });
        }
    };

    // Table columns
    const columns = [
        { name: "S.No.", selector: (row, index) => index + 1, sortable: true, width: "80px" },
        {
            name: "Sub Heading",
            selector: (row) => row.sub_heading || "-",
            sortable: true,
            wrap: true,
        },
        {
            name: "Image",
            cell: (row) => {
                const imageFile = row.image_carousel; // single image filename
                return imageFile ? (
                    <img
                        src={`${API_PATH}/uploads/careers/${imageFile}`}
                        alt="career"
                        width="80"
                        style={{ borderRadius: "8px" }}
                    />
                ) : (
                    <span>No image</span>
                );
            },
        },

        {
            name: "Status",
            cell: (row) => (
                <CBadge color={row.status === "active" ? "success" : "danger"}>
                    {row.status === "active" ? "Active" : "Inactive"}
                </CBadge>
            ),
            sortable: true,
            width: "100px"
        },
        {
            name: "Action",
            cell: (row) => (
                <div className="d-flex gap-2">
                    <Link
                        to="/admin/edit-case-studies-banner"
                        state={{ id: row.id }}
                    >
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

    // Fetch data
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/case-studies-banner/getallcase-studies-banner");
                if (response.data && Array.isArray(response.data)) {
                    setData(response.data);
                } else {
                    console.warn("Unexpected API response:", response.data);
                }
            } catch (error) {
                console.error("Error fetching careers:", error);
                toast.error("Failed to fetch careers!");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
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
                                    </Link>
                                    / Case Studies Banner
                                </CBreadcrumbItem>
                            </CBreadcrumb>
                        </div>
                    </div>

                    <div className='row mb-3'>
                        <div className='col-lg-6 d-flex align-items-center'>
                            <CBreadcrumb className="mx-3 mb-0">
                                <CBreadcrumbItem>Case Studies</CBreadcrumbItem>
                            </CBreadcrumb>
                        </div>
                        <div className='col-lg-6 d-flex justify-content-end'>
                            <Link to="/admin/add-case-studies-banner" className='text-decoration-none'>
                                <CButton className='custom-button text-white align-items-center d-flex gap-2'>
                                    <CIcon icon={cilPlus} size="lg" />
                                    Add Case Studies Banner
                                </CButton>
                            </Link>
                        </div>
                    </div>

                    <DataTable
                        columns={columns}
                        data={data}
                        progressPending={loading}
                        pagination
                    />
                </div>
                <AppFooter />
            </div>
        </div>
    );
}
