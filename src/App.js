import React, { Suspense, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CSpinner, useColorModes } from '@coreui/react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// import '../src/components/admin2/scss/style.scss'
// import '../src/components/admin2/scss/examples.scss'

// Layouts
import Home from './components/layout/Home'
import About from './components/layout/About'
import Leadership from './components/layout/Leadership'
import ProjectPortfolio from './components/layout/ProjectPortfolio'
import ProjectDetails from './components/layout/ProjectDetails'
import Blog from './components/layout/Blog'
import BlogDetails from './components/layout/BlogDetails'
import CaseStudies from './components/layout/CaseStudies'
import CaseStudiesDetails from './components/layout/CaseStudiesDetails'
import Newsroom from './components/layout/Newsroom'
import PressRelease from './components/layout/PressRelease'
import PressReleaseDetails from './components/layout/PressReleaseDetails'
import MediaResources from './components/layout/MediaResources'
import MediaCoverages from './components/layout/MediaCoverages'
import Contact from './components/layout/Contact'
import Awards from './components/layout/Awards'
import Culture from './components/layout/Culture'
import Faqs from './components/layout/Faqs'
import PreDevelopment from './components/layout/PreDevelopment'
import EPCProject from './components/layout/EPCProject'
import GridInfrastructure from './components/layout/GridInfrastructure'
import Independent from './components/layout/Independent'
import Career from './components/layout/Career'
import Investors from './components/layout/Investors'
import MediaCoveragesDetails from './components/layout/MediaCoveragesDetails';
// import { head } from '../backend/routes/authRoute';

// Admin
const DefaultLayout = React.lazy(() => import('../src/components/admin2/layout/DefaultLayout'))
const Register = React.lazy(() => import('../src/components/admin2/views/pages/register/Register'))
const Login = React.lazy(() => import('../src/components/admin2/views/pages/login/Login'))
// HomePage 
const Banner = React.lazy(() => import('../src/components/admin2/views/pages/Banner/BanerList'))
const AddBanner = React.lazy(() => import('../src/components/admin2/views/pages/Banner/AddBanner'))
const EditBanner = React.lazy(() => import('../src/components/admin2/views/pages/Banner/EditBanner'))
// Busniess section 
const Business = React.lazy(() => import('../src/components/admin2/views/pages/Homepage/Business/BusinessList'))
const AddBusiness = React.lazy(() => import('../src/components/admin2/views/pages/Homepage/Business/AddBusiness'))
const EditBusiness = React.lazy(() => import('../src/components/admin2/views/pages/Homepage/Business/EditBusiness'))
const Page404 = React.lazy(() => import('../src/components/admin2/views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('../src/components/admin2/views/pages/page500/Page500'))
// client
const Client = React.lazy(() => import('../src/components/admin2/views/pages/Homepage/Clients/ClientList'))
const AddClient = React.lazy(() => import('../src/components/admin2/views/pages/Homepage/Clients/AddClient'))
const EditClient = React.lazy(() => import('../src/components/admin2/views/pages/Homepage/Clients/EditClient'))
// sustainability
const Sustainability = React.lazy(() => import('../src/components/admin2/views/pages/Homepage/Sustainability/sustainabilityList'))
const AddSustainability = React.lazy(() => import('../src/components/admin2/views/pages/Homepage/Sustainability/AddSustainability'))
const EditSustainability = React.lazy(() => import('../src/components/admin2/views/pages/Homepage/Sustainability/EditSustainability'))
// Portfolio
const Portfolio = React.lazy(() => import('../src/components/admin2/views/pages/Homepage/Portfolio/PortfolioList'))
const AddPortfolio = React.lazy(() => import('../src/components/admin2/views/pages/Homepage/Portfolio/AddPortfolio'))
const EditPortfolio = React.lazy(() => import('../src/components/admin2/views/pages/Homepage/Portfolio/EditPortfolio'))
// career 
const HomeCareer = React.lazy(() => import('../src/components/admin2/views/pages/Homepage/Careers/Careers'))
const AddCareer = React.lazy(() => import('../src/components/admin2/views/pages/Homepage/Careers/AddCareer'))
const EditCareer = React.lazy(() => import('../src/components/admin2/views/pages/Homepage/Careers/EditCareer'))
// About Page 
const AboutList = React.lazy(() => import('../src/components/admin2/views/pages/About/AboutOne'))
const AddAbout = React.lazy(() => import('../src/components/admin2/views/pages/About/AddAboutBanner'))
const EditAboutBanner = React.lazy(() => import('../src/components/admin2/views/pages/About/EditAboutBanner'))
// Company Overview
const ComOne = React.lazy(() => import('../src/components/admin2/views/pages/About/CompanyOverview/ComOne'))
const AddComBanner = React.lazy(() => import('../src/components/admin2/views/pages/About/CompanyOverview/AddComBanner'))
const EditComBanner = React.lazy(() => import('../src/components/admin2/views/pages/About/CompanyOverview/EditComBanner'))
// purpose
const PurposeList = React.lazy(() => import('../src/components/admin2/views/pages/About/Purpose/PurposeOne'))
const AddPurpose = React.lazy(() => import('../src/components/admin2/views/pages/About/Purpose/Addpurpose'))
const EditPurposeBanner = React.lazy(() => import('../src/components/admin2/views/pages/About/Purpose/Editpurpose'))
// core values
const CoreValuesOne = React.lazy(() => import('../src/components/admin2/views/pages/About/CoreValues/CoreValuesOne'))
const AddcoreValues = React.lazy(() => import('../src/components/admin2/views/pages/About/CoreValues/AddcoreValues'))
const EditcoreValues = React.lazy(() => import('../src/components/admin2/views/pages/About/CoreValues/EditcoreValues'))
// Timeline
const TimelineOne = React.lazy(() => import('../src/components/admin2/views/pages/About/Timeline/TimelineOne'))
const AddTimeline = React.lazy(() => import('../src/components/admin2/views/pages/About/Timeline/AddTimeline'))
const EditTimeline = React.lazy(() => import('../src/components/admin2/views/pages/About/Timeline/EditTimeline'))
// leadership
const LeadershipOne = React.lazy(() => import('../src/components/admin2/views/pages/About/Leadership/leadershipOne'))
const Addleadership = React.lazy(() => import('../src/components/admin2/views/pages/About/Leadership/Addleadership'))
const Editleadership = React.lazy(() => import('../src/components/admin2/views/pages/About/Leadership/Editleadership'))
// management
const ManagementOne = React.lazy(() => import('../src/components/admin2/views/pages/About/KeyManagement/managementOne'))
const Addmanagement = React.lazy(() => import('../src/components/admin2/views/pages/About/KeyManagement/Addmanagement'))
const Editmanagement = React.lazy(() => import('../src/components/admin2/views/pages/About/KeyManagement/Editmanagement'))
// Project Portfolio
const ProjectOne = React.lazy(() => import('../src/components/admin2/views/pages/About/ProjectPortfolio/ProjectOne'))
const AddProject = React.lazy(() => import('../src/components/admin2/views/pages/About/ProjectPortfolio/AddProject'))
const EditProject = React.lazy(() => import('../src/components/admin2/views/pages/About/ProjectPortfolio/EditProject'))
// Portfolio oVERVIEW
const PortfolioOne = React.lazy(() => import('../src/components/admin2/views/pages/About/PortfolioOverview/PortfolioOne'))
const AddAboutPortfolio = React.lazy(() => import('../src/components/admin2/views/pages/About/PortfolioOverview/AddPortfolio '))
const EditAboutPortfolio = React.lazy(() => import('../src/components/admin2/views/pages/About/PortfolioOverview/EditPortfolio '))
// Business
const PreDevelopmentList = React.lazy(() => import('./components/admin2/views/pages/Business/PreDevelopment/Banner/ListPreDevelopment'))
const AddPreDevelopment = React.lazy(() => import('../src/components/admin2/views/pages/Business/PreDevelopment/Banner/AddPreDevelopment'))
const EditPreDevelopment = React.lazy(() => import('../src/components/admin2/views/pages/Business/PreDevelopment/Banner/EditPreDevelopment'))
// Culture
const ListCulture = React.lazy(() => import('./components/admin2/views/pages/Culture/ListCulture'))
const AddCulture = React.lazy(() => import('../src/components/admin2/views/pages/Culture/AddCulture'))
const EditCulture = React.lazy(() => import('../src/components/admin2/views/pages/Culture/EditCulture'))
// Awards
const ListAwards = React.lazy(() => import('./components/admin2/views/pages/Awards/ListAwards'))
const AddAwards = React.lazy(() => import('../src/components/admin2/views/pages/Awards/AddAwards'))
const EditAwards = React.lazy(() => import('../src/components/admin2/views/pages/Awards/EditAwards'))
// contact 
const ContactList = React.lazy(() => import('./components/admin2/views/pages/Contact/ContactList'))
const AddContact = React.lazy(() => import('../src/components/admin2/views/pages/Contact/AddContact'))
const EditContact = React.lazy(() => import('./components/admin2/views/pages/Contact/EditContact'))
// admmin Career
const CareerAdminList = React.lazy(() => import('./components/admin2/views/pages/CareerPage/CareerList'))
const AddAdminCareer = React.lazy(() => import('../src/components/admin2/views/pages/CareerPage/AddCareer'))
const EditAdminContact = React.lazy(() => import('./components/admin2/views/pages/CareerPage/EditCareers'))
// press - release
const PressReleaseList = React.lazy(() => import('./components/admin2/views/pages/PressRelease/PressReleaseList'))
const AddPressRelease = React.lazy(() => import('../src/components/admin2/views/pages/PressRelease/AddPressRelease'))
const EditPressRelease = React.lazy(() => import('./components/admin2/views/pages/PressRelease/EditPressRelease'))
// PressRelease Banner 
const PressReleaseBanner = React.lazy(() => import('./components/admin2/views/pages/PressRelease/Banner/PressReleaseBanner'))
const AddPressReleaseBanner = React.lazy(() => import('../src/components/admin2/views/pages/PressRelease/Banner/AddPressRelease'))
const EditPressReleaseBanner = React.lazy(() => import('./components/admin2/views/pages/PressRelease/Banner/EditPressRelease'))
// MediaCoverages Banner
const MediaCoveragesBanner = React.lazy(() => import('./components/admin2/views/pages/MediaCoverages/Banner/MediaCoveragesBanner'))
const AddMediaCoverages = React.lazy(() => import('../src/components/admin2/views/pages/MediaCoverages/Banner/AddMediaCoverages'))
const EditMediaCoverages = React.lazy(() => import('./components/admin2/views/pages/MediaCoverages/Banner/EditMediaCoverages'))
// media release list
const MediaReleaseList = React.lazy(() => import('./components/admin2/views/pages/MediaCoverages/MediaReleaseList'))
const AddMediaRelease = React.lazy(() => import('../src/components/admin2/views/pages/MediaCoverages/AddMediaRelease'))
const EditMediaRelease = React.lazy(() => import('./components/admin2/views/pages/MediaCoverages/EditMediaRelease'))
// FAQs Banner
const FaqBanner = React.lazy(() => import('./components/admin2/views/pages/FAQs/Banner/FAQsBanner'))
const AddFaqBanner = React.lazy(() => import('../src/components/admin2/views/pages/FAQs/Banner/AddFAQs'))
const EditFaqBanner = React.lazy(() => import('./components/admin2/views/pages/FAQs/Banner/EditFAQs'))
// FAQS Questions
const FaqQuestions = React.lazy(() => import('./components/admin2/views/pages/FAQs/ListFaqQues'))
const AddFaqQuestions = React.lazy(() => import('./components/admin2/views/pages/FAQs/AddFaqQues'))
const EditFaqQuestions = React.lazy(() => import('./components/admin2/views/pages/FAQs/EditFaqQues'))
// Blog
const BlogList = React.lazy(() => import('./components/admin2/views/pages/Blog/Banner/BlogBanner'))
const AddBlog = React.lazy(() => import('./components/admin2/views/pages/Blog/Banner/AddBlog'))
const EditBlog = React.lazy(() => import('./components/admin2/views/pages/Blog/Banner/EditBlog'))
// Blog Detail 
const BlogDetailList = React.lazy(() => import('./components/admin2/views/pages/Blog/BlogDetailList'))
const BlogAdd = React.lazy(() => import('./components/admin2/views/pages/Blog/BlogAdd'))
const EditBlogDetail = React.lazy(() => import('./components/admin2/views/pages/Blog/EditBlogDetail'))
// Case Studies banner
const CaseStudiesBanner = React.lazy(() => import('./components/admin2/views/pages/CaseStudies/Banner/CaseStudiesBanner'))
const AddCaseStudiesBanner = React.lazy(() => import('./components/admin2/views/pages/CaseStudies/Banner/AddCaseStudiesBanner'))
const EditCaseStudiesBanner = React.lazy(() => import('./components/admin2/views/pages/CaseStudies/Banner/EditCaseStudiesBanner'))
// Case Studies
const CaseStudiesList = React.lazy(() => import('./components/admin2/views/pages/CaseStudies/CaseStudiesList'))
const AddCaseStudy = React.lazy(() => import('./components/admin2/views/pages/CaseStudies/AddCaseStudy'))
const EditCaseStudy = React.lazy(() => import('./components/admin2/views/pages/CaseStudies/EditCaseStudy'))
// Heading 
const ListHeading = React.lazy(() => import('./components/admin2/views/pages/Banner/Heading/ListHeading'))
const AddHeading = React.lazy(() => import('./components/admin2/views/pages/Banner/Heading/AddHeading'))
const EditHeading = React.lazy(() => import('./components/admin2/views/pages/Banner/Heading/EditHeading'))
// Sustainability
const ListHeadingSus = React.lazy(() => import('./components/admin2/views/pages/Homepage/Sustainability/Heading/ListHeadingSus'))
const AddHeadingSus = React.lazy(() => import('./components/admin2/views/pages/Homepage/Sustainability/Heading/AddHeadingSus'))
const EditHeadingSus = React.lazy(() => import('./components/admin2/views/pages/Homepage/Sustainability/Heading/EditHeadingSus'))
// Portfolio
const ListHeadingPort = React.lazy(() => import('./components/admin2/views/pages/Homepage/Portfolio/Heading/ListHeadingPortfolio'))
const AddHeadingPort = React.lazy(() => import('./components/admin2/views/pages/Homepage/Portfolio/Heading/AddHeadingPortfolio'))
const EditHeadingPort = React.lazy(() => import('./components/admin2/views/pages/Homepage/Portfolio/Heading/EditHeadingPortfolio'))
// Mapping
const ListMapping = React.lazy(() => import('./components/admin2/views/pages/About/Mapping/ListMapping'))
const AddMapping = React.lazy(() => import('./components/admin2/views/pages/About/Mapping/AddMapping'))
const EditMapping = React.lazy(() => import('./components/admin2/views/pages/About/Mapping/EditMapping'))
// Portfolio heading
const ListHeadingPortfolio = React.lazy(() => import('./components/admin2/views/pages/About/PortfolioOverview/Heading/ListPortfolio'))
const AddHeadingPortfolio = React.lazy(() => import('./components/admin2/views/pages/About/PortfolioOverview/Heading/AddPortfolio'))
const EditHeadingPortfolio = React.lazy(() => import('./components/admin2/views/pages/About/PortfolioOverview/Heading/EditPortfolio'))
// careers heading 
const ListHeadingCareers = React.lazy(() => import('./components/admin2/views/pages/Homepage/Careers/Heading/ListHeadingCareers'))
const AddHeadingCareers = React.lazy(() => import('./components/admin2/views/pages/Homepage/Careers/Heading/AddHeadingCareers'))
const EditHeadingCareers = React.lazy(() => import('./components/admin2/views/pages/Homepage/Careers/Heading/EditHeadingCareers'))
// Culture Portfolio
const AddPortfolioCulture = React.lazy(() => import('./components/admin2/views/pages/Culture/Portfolio/AddPortfolio'))
const EditPortfolioCulture = React.lazy(() => import('./components/admin2/views/pages/Culture/Portfolio/EditPortfolio'))
const ViewPortfolioCulture = React.lazy(() => import('./components/admin2/views/pages/Culture/Portfolio/PortfolioList'))
// Media Resources
const ListMediaResources = React.lazy(() => import('./components/admin2/views/pages/MediaResources/ResourcesList'))
const AddMediaResources = React.lazy(() => import('./components/admin2/views/pages/MediaResources/ResourcesAdd'))
const EditMediaResources = React.lazy(() => import('./components/admin2/views/pages/MediaResources/ResourcesEdit'))
// Media Resources video
const ListMediaResourcesVideo = React.lazy(() => import('./components/admin2/views/pages/MediaResources/Video/ResourcesList'))
const AddMediaResourcesVideo = React.lazy(() => import('./components/admin2/views/pages/MediaResources/Video/ResourcesAdd'))
const EditMediaResourcesVideo = React.lazy(() => import('./components/admin2/views/pages/MediaResources/Video/ResourcesEdit'))

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="pt-3 text-center">
              <CSpinner color="primary" variant="grow" />
            </div>
          }
        >
          <Routes>
            {/* 🌐 Main Website Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about-us/who-we-are" element={<About />} />
            <Route path="/about-us/leadership-team" element={<Leadership />} />
            <Route path="/about-us/project-portfolio" element={<ProjectPortfolio />} />
            <Route path="/project-details" element={<ProjectDetails />} />
            <Route path="/blogs" element={<Blog />} />
            <Route path="/blog-detail/:id" element={<BlogDetails />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/case-studie-details/:id" element={<CaseStudiesDetails />} />
            <Route path="/newsroom" element={<Newsroom />} />
            <Route path="/press-release" element={<PressRelease />} />
            <Route path="/press-release-details/:id" element={<PressReleaseDetails />} />
            <Route path="/media-coverages" element={<MediaCoverages />} />
            <Route path="/media-detail/:id" element={<MediaCoveragesDetails />} />
            <Route path="/media-resources" element={<MediaResources />} />
            <Route path="/contact-us" element={<Contact />} />
            <Route path="/awards" element={<Awards />} />
            <Route path="/culture" element={<Culture />} />
            <Route path="/faqs" element={<Faqs />} />
            <Route path="/business/pre-development" element={<PreDevelopment />} />
            <Route path="/business/epc-project" element={<EPCProject />} />
            <Route path="/business/grid-infrastructure" element={<GridInfrastructure />} />
            <Route path="/business/independent-power-producer" element={<Independent />} />
            <Route path="/careers" element={<Career />} />
            <Route path="/investors" element={<Investors />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<Login />} />
            <Route path="/admin/register" element={<Register />} />
            <Route path="/admin/404" element={<Page404 />} />
            <Route path="/admin/500" element={<Page500 />} />
            <Route path="/admin/*" element={<DefaultLayout />} />
            <Route path="/admin/banner" element={<Banner />} />
            <Route path="/admin/add-banner" element={<AddBanner />} />
            <Route path="/admin/edit-banner" element={<EditBanner />} />
            {/* Business */}
            <Route path="/admin/business" element={<Business />} />
            <Route path="/admin/add-business" element={<AddBusiness />} />
            <Route path="/admin/edit-business" element={<EditBusiness />} />
            {/* Client */}
            <Route path="/admin/clients" element={<Client />} />
            <Route path="/admin/add-client" element={<AddClient />} />
            <Route path="/admin/edit-client" element={<EditClient />} />
            {/* Sustainability */}
            <Route path="/admin/sustainability" element={<Sustainability />} />
            <Route path="/admin/add-sustainability" element={<AddSustainability />} />
            <Route path="/admin/edit-sustainability" element={<EditSustainability />} />
            {/* Portfolio */}
            <Route path="/admin/portfolio" element={<Portfolio />} />
            <Route path="/admin/add-portfolio" element={<AddPortfolio />} />
            <Route path="/admin/edit-portfolio" element={<EditPortfolio />} />
            {/* Career */}
            <Route path="/admin/careers" element={<HomeCareer />} />
            <Route path="/admin/add-career" element={<AddCareer />} />
            <Route path="/admin/edit-career" element={<EditCareer />} />
            {/* About  */}
            <Route path="/admin/about-banner" element={<AboutList />} />
            <Route path="/admin/add-about-banner" element={<AddAbout />} />
            <Route path="/admin/edit-about-banner" element={<EditAboutBanner />} />
            {/* Company Overview */}
            <Route path="/admin/overview" element={<ComOne />} />
            <Route path="/admin/add-com-banner" element={<AddComBanner />} />
            <Route path="/admin/edit-com-banner" element={<EditComBanner />} />
            {/* Purpose */}
            <Route path="/admin/purpose" element={<PurposeList />} />
            <Route path="/admin/add-purpose" element={<AddPurpose />} />
            <Route path="/admin/edit-purpose" element={<EditPurposeBanner />} />
            {/* core values */}
            <Route path="/admin/core-values" element={<CoreValuesOne />} />
            <Route path="/admin/add-core-values" element={<AddcoreValues />} />
            <Route path="/admin/edit-core-values" element={<EditcoreValues />} />
            {/* Timeline  */}
            <Route path="/admin/timelines" element={<TimelineOne />} />
            <Route path="/admin/add-timeline" element={<AddTimeline />} />
            <Route path="/admin/edit-timeline" element={<EditTimeline />} />
            {/* leadership */}
            <Route path="/admin/leadership" element={<LeadershipOne />} />
            <Route path="/admin/add-leadership" element={<Addleadership />} />
            <Route path="/admin/edit-leadership" element={<Editleadership />} />
            {/* management */}
            <Route path="/admin/management" element={<ManagementOne />} />
            <Route path="/admin/add-management" element={<Addmanagement />} />
            <Route path="/admin/edit-management" element={<Editmanagement />} />
            {/* ProjectPortfolio */}
            <Route path="/admin/project-portfolio" element={<ProjectOne />} />
            <Route path="/admin/add-project-portfolio" element={<AddProject />} />
            <Route path="/admin/edit-project-portfolio" element={<EditProject />} />
            {/* Portfolio oVERVIEW */}
            <Route path="/admin/portfolio-overview" element={<PortfolioOne />} />
            <Route path="/admin/add-portfolio-overview" element={<AddAboutPortfolio />} />
            <Route path="/admin/edit-portfolio-overview" element={<EditAboutPortfolio />} />
            {/* Business  */}
            <Route path="/admin/businesses" element={<PreDevelopmentList />} />
            <Route path="/admin/add-pre-development-epc" element={<AddPreDevelopment />} />
            <Route path="/admin/edit-pre-development-epc" element={<EditPreDevelopment />} />
            {/* Culture */}
            <Route path="/admin/cultures" element={<ListCulture />} />
            <Route path="/admin/add-culture" element={<AddCulture />} />
            <Route path="/admin/edit-culture" element={<EditCulture />} />
            {/* Awards */}
            <Route path="/admin/awards" element={<ListAwards />} />
            <Route path="/admin/add-awards" element={<AddAwards />} />
            <Route path="/admin/edit-awards" element={<EditAwards />} />
            {/* Contact */}
            <Route path="/admin/contact" element={<ContactList />} />
            <Route path="/admin/add-contact" element={<AddContact />} />
            <Route path="/admin/edit-contact" element={<EditContact />} />
            {/* Career Page Admin */}
            <Route path="/admin/careers-list" element={<CareerAdminList />} />
            <Route path="/admin/add-career-admin" element={<AddAdminCareer />} />
            <Route path="/admin/edit-career-admin" element={<EditAdminContact />} />
            {/* Press Release */}
            <Route path="/admin/press-release-list" element={<PressReleaseList />} />
            <Route path="/admin/add-press-release" element={<AddPressRelease />} />
            <Route path="/admin/edit-press-release" element={<EditPressRelease />} />
            {/* Press Release Banner */}
            <Route path="/admin/press-release-banner" element={<PressReleaseBanner />} />
            <Route path="/admin/add-press-release-banner" element={<AddPressReleaseBanner />} />
            <Route path="/admin/edit-press-release-banner" element={<EditPressReleaseBanner />} />
            {/* Media Coverages Banner */}
            <Route path="/admin/media-coverages-banner" element={<MediaCoveragesBanner />} />
            <Route path="/admin/add-media-coverages-banner" element={<AddMediaCoverages />} />
            <Route path="/admin/edit-media-coverages-banner" element={<EditMediaCoverages />} />
            {/* Media Release List */}
            <Route path="/admin/media-release-list" element={<MediaReleaseList />} />
            <Route path="/admin/add-media-release" element={<AddMediaRelease />} />
            <Route path="/admin/edit-media-release" element={<EditMediaRelease />} />
            {/* FAQs Banner */}
            <Route path="/admin/faqs-banner" element={<FaqBanner />} />
            <Route path="/admin/add-faqs-banner" element={<AddFaqBanner />} />
            <Route path="/admin/edit-faqs-banner" element={<EditFaqBanner />} />
            {/* FAQs Questions */}
            <Route path="/admin/faqs-questions" element={<FaqQuestions />} />
            <Route path="/admin/add-faqs-questions" element={<AddFaqQuestions />} />
            <Route path="/admin/edit-faqs-questions" element={<EditFaqQuestions />} />
            {/* Blog */}
            <Route path="/admin/blog-list" element={<BlogList />} />
            <Route path="/admin/add-blog" element={<AddBlog />} />
            <Route path="/admin/edit-blog" element={<EditBlog />} />
            {/* Blog Detail */}
            <Route path="/admin/blog-detail-list" element={<BlogDetailList />} />
            <Route path="/admin/add-blog-detail" element={<BlogAdd />} />
            <Route path="/admin/edit-blog-detail" element={<EditBlogDetail />} />
            {/* Case Studies */}
            <Route path="/admin/case-studies-list" element={<CaseStudiesList />} />
            <Route path="/admin/add-case-study" element={<AddCaseStudy />} />
            <Route path="/admin/edit-case-study" element={<EditCaseStudy />} />
            {/* Case Studies Banner */}
            <Route path="/admin/case-studies-banner" element={<CaseStudiesBanner />} />
            <Route path="/admin/add-case-studies-banner" element={<AddCaseStudiesBanner />} />
            <Route path="/admin/edit-case-studies-banner" element={<EditCaseStudiesBanner />} />
            {/* Heading */}
            <Route path="/admin/list-heading" element={<ListHeading />} />
            <Route path="/admin/add-heading" element={<AddHeading />} />
            <Route path="/admin/edit-heading" element={<EditHeading />} />
            {/* Sustainability Heading */}
            <Route path="/admin/list-heading-sus" element={<ListHeadingSus />} />
            <Route path="/admin/add-heading-sus" element={<AddHeadingSus />} />
            <Route path="/admin/edit-heading-sus" element={<EditHeadingSus />} />
            {/* Portfolio Heading */}
            <Route path="/admin/portfolio-heading" element={<ListHeadingPort />} />
            <Route path="/admin/add-portfolio-heading" element={<AddHeadingPort />} />
            <Route path="/admin/edit-portfolio-heading" element={<EditHeadingPort />} />
            {/* Mapping */}
            <Route path="/admin/mapping" element={<ListMapping />} />
            <Route path="/admin/add-mapping" element={<AddMapping />} />
            <Route path="/admin/edit-mapping" element={<EditMapping />} />
            {/* Portfolio heading */}
            <Route path="/admin/portfolio-page-heading" element={<ListHeadingPortfolio />} />
            <Route path="/admin/add-portfolio-page-heading" element={<AddHeadingPortfolio />} />
            <Route path="/admin/edit-portfolio-page-heading" element={<EditHeadingPortfolio />} />
            {/* careers heading  */}
            <Route path="/admin/careers-heading" element={<ListHeadingCareers />} />
            <Route path="/admin/add-careers-heading" element={<AddHeadingCareers />} />
            <Route path="/admin/edit-careers-heading" element={<EditHeadingCareers />} />
            {/* Culture Portfolio */}
            <Route path="/admin/culture-portfolio-list" element={<ViewPortfolioCulture />} />
            <Route path="/admin/add-culture-portfolio" element={<AddPortfolioCulture />} />
            <Route path="/admin/edit-culture-portfolio" element={<EditPortfolioCulture />} />
            {/* Media Resources */}
            <Route path="/admin/media-resources-list" element={<ListMediaResources />} />
            <Route path="/admin/add-media-resources" element={<AddMediaResources />} />
            <Route path="/admin/edit-media-resources" element={<EditMediaResources />} />
            {/* Media Resources video */}
            <Route path="/admin/media-resources-video-list" element={<ListMediaResourcesVideo />} />
            <Route path="/admin/add-media-resources-video" element={<AddMediaResourcesVideo />} />
            <Route path="/admin/edit-media-resources-video" element={<EditMediaResourcesVideo />} />

          </Routes>
        </Suspense>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastStyle={{ fontFamily: 'Poppins, sans-serif' }}
      />

    </>
  )
}

export default App
