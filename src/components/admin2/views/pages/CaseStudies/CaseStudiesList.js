import React, { useEffect, useState } from "react";
import { AppSidebar, AppFooter, AppHeader } from "../../../components/index";
import "../../../../admin2/scss/style.scss";
import "../../../../admin2/scss/examples.scss";
import "../../../../admin2/scss/custom.css";
import DataTable from "react-data-table-component";
import { CBreadcrumb, CBreadcrumbItem, CButton, CBadge } from "@coreui/react";
import { Link } from "react-router-dom";
import { cilPlus, cilPencil, cilTrash } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { toast } from "react-toastify";
import api from "../../../../../api/axiosInstance";
import API_PATH from "../../../../../api/apiPath";

export default function BlogDetailList() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    // Delete blog
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this case study?")) {
            api
                .delete(`/case-studies/delete-case-study/${id}`)
                .then((response) => {
                    toast.success("Case Study deleted successfully!");
                    setData((prev) => prev.filter((caseStudy) => caseStudy.id !== id));
                })
                .catch((err) => {
                    console.error(err);
                    toast.error("Something went wrong while deleting!");
                });
        }
    };

    // Table columns
    const columns = [
        { name: "S.No.", selector: (row, index) => index + 1, width: "80px" },
        {
            name: "Heading",
            selector: (row) => row.sub_heading || "-",
            sortable: true,
            wrap: true,
        },
        {
            name: "Banner Image",
            cell: (row) =>
                row.banner_image ? (
                    <img
                        src={`${API_PATH}/uploads/blogs/${row.banner_image}`}
                        alt="banner"
                        width="80"
                        style={{ borderRadius: "8px" }}
                    />
                ) : (
                    <span>No Image</span>
                ),
        },
        {
            name: "Inner Image",
            cell: (row) =>
                row.blog_inner_image ? (
                    <img
                        src={`${API_PATH}/uploads/blogs/${row.blog_inner_image}`}
                        alt="inner"
                        width="80"
                        style={{ borderRadius: "8px" }}
                    />
                ) : (
                    <span>No Image</span>
                ),
        },
        {
            name: "Content",
            selector: (row) =>
                row.content?.length > 80
                    ? row.content.substring(0, 80) + "..."
                    : row.content || "-",
            wrap: true,
        },
        {
            name: "Date",
            selector: (row) => row.blog_date || "-",
            sortable: true,
            width: "120px",
        },
        {
            name: "Status",
            cell: (row) => (
                <CBadge color={row.status === "active" ? "success" : "danger"}>
                    {row.status === "active" ? "Active" : "Inactive"}
                </CBadge>
            ),
            width: "100px",
        },
        {
            name: "Action",
            cell: (row) => (
                <div className="d-flex gap-2">
                    <Link to="/admin/edit-case-study" state={{ id: row.id }}>
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
                const response = await api.get("/case-studies/getall-case-studies");
                if (response.data && Array.isArray(response.data)) {
                    setData(response.data);
                } else {
                    console.warn("Unexpected API response:", response.data);
                }
            } catch (error) {
                console.error("Error fetching blogs:", error);
                toast.error("Failed to fetch blogs!");
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
                    {/* Breadcrumb */}
                    <div className="row bg-white mx-1 mb-3 py-3 shadow-sm">
                        <div className="col-lg-12 d-flex align-items-center">
                            <CBreadcrumb className="mb-0">
                                <CBreadcrumbItem>
                                    <Link to="/admin/dashboard" className="text-decoration-none">
                                        Home
                                    </Link>
                                    / Case Studies
                                </CBreadcrumbItem>
                            </CBreadcrumb>
                        </div>
                    </div>

                    {/* Header + Add Button */}
                    <div className="row mb-3">
                        <div className="col-lg-6 d-flex align-items-center">
                            <CBreadcrumb className="mx-3 mb-0">
                                <CBreadcrumbItem>Case Studies List</CBreadcrumbItem>
                            </CBreadcrumb>
                        </div>
                        <div className="col-lg-6 d-flex justify-content-end">
                            <Link to="/admin/add-case-study" className="text-decoration-none">
                                <CButton className="custom-button text-white align-items-center d-flex gap-2">
                                    <CIcon icon={cilPlus} size="lg" />
                                    Add Case Study
                                </CButton>
                            </Link>
                        </div>
                    </div>

                    {/* Table */}
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
