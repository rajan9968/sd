import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilExternalLink,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/admin/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Home Page',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Banner',
        to: '/admin/banner'
      },
      {
        component: CNavGroup,
        name: 'Business Section',
        to: '/admin/business',
        items: [
          {
            component: CNavItem,
            name: 'Heading',
            to: '/admin/list-heading',
          },
          {
            component: CNavItem,
            name: 'Business',
            to: '/admin/business',
          },

        ],
      },

      {
        component: CNavItem,
        name: 'Clients',
        to: '/admin/clients',
      },
      {
        component: CNavGroup,
        name: 'Sustainability',
        to: '/admin/sustainability',
        items: [
          {
            component: CNavItem,
            name: 'Heading',
            to: '/admin/list-heading-sus',
          },
          {
            component: CNavItem,
            name: 'Add sustainability',
            to: '/admin/sustainability',
          },

        ],
      },
      {
        component: CNavGroup,
        name: 'Portfolio',
        to: '/admin/portfolio',
        items: [
          {
            component: CNavItem,
            name: 'Heading',
            to: '/admin/portfolio-heading',
          },
          {
            component: CNavItem,
            name: 'Add Portfolio',
            to: '/admin/portfolio',
          },

        ],
      },
      {
        component: CNavGroup,
        name: 'Careers',
        to: '/admin/careers',
        items: [
          {
            component: CNavItem,
            name: 'Heading',
            to: '/admin/careers-heading',
          },
          {
            component: CNavItem,
            name: 'Add Careers',
            to: '/admin/careers',
          },

        ],
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Who We Are Page',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Banner',
        to: '/admin/about-banner'
      },
      {
        component: CNavItem,
        name: 'Company Overview',
        to: '/admin/overview',
      },
      {
        component: CNavItem,
        name: 'Purpose section',
        to: '/admin/purpose',
      },
      {
        component: CNavItem,
        name: 'Core Values',
        to: '/admin/core-values',
      },
      {
        component: CNavItem,
        name: 'Timeline',
        to: '/admin/timelines',
      },
      {
        component: CNavItem,
        name: 'Mapping',
        to: '/admin/mapping',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Leadership Page',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Banner',
        to: '/admin/leadership'
      },
      {
        component: CNavItem,
        name: 'Key Management',
        to: '/admin/management',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Project Portfolio Page',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Banner',
        to: '/admin/project-portfolio'
      },
      {
        component: CNavItem,
        name: 'Heading',
        to: '/admin/portfolio-page-heading',
      },
      {
        component: CNavItem,
        name: 'Portfolio Overview',
        to: '/admin/portfolio-overview',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Business Page',
    to: '/admin/businesses',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Culture Page',
    to: '/admin/cultures',
    items: [
      {
        component: CNavItem,
        name: 'Add Culture',
        to: '/admin/cultures',
      },
      {
        component: CNavItem,
        name: 'Key Initiatives Heading',
        to: '/admin/portfolio-heading',
      },
      {
        component: CNavItem,
        name: 'Add Key Initiatives',
        to: '/admin/culture-portfolio-list',
      },

    ],
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Awards Page',
    to: '/admin/awards',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Contact Page',
    to: '/admin/contact',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Career Page',
    to: '/admin/careers-list',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Media Coverages Page',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Banner',
        to: '/admin/media-coverages-banner'
      },
      {
        component: CNavItem,
        name: 'Media Coverages',
        to: '/admin/media-release-list',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Press Releases Page',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Banner',
        to: '/admin/press-release-banner'
      },
      {
        component: CNavItem,
        name: 'Press Releases',
        to: '/admin/press-release-list',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Media Resources Page',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Photo Gallery',
        to: '/admin/media-resources-list'
      },
      {
        component: CNavItem,
        name: 'Video Gallery',
        to: '/admin/media-resources-video-list',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'FAQs Page',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Banner',
        to: '/admin/faqs-banner'
      },
      {
        component: CNavItem,
        name: 'FAQs',
        to: '/admin/faqs-questions',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Blog Page',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Banner',
        to: '/admin/blog-list'
      },
      {
        component: CNavItem,
        name: 'Blogs',
        to: '/admin/blog-detail-list',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Case Studies Page',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Banner',
        to: '/admin/case-studies-banner'
      },
      {
        component: CNavItem,
        name: 'Case Studies',
        to: '/admin/case-studies-list',
        icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
      },
    ],
  },

]

export default _nav
