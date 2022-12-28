import React from 'react';
import {Permissions} from '../constants';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faPieChart, faUser, faTruck, faUserGroup, faHome, faBoxes, faPrint, faBookmark, faBoxOpen,
    faMoneyCheckDollar, faMoneyBills, faQuoteRight, faDollarSign, faReceipt, faArrowRight, faArrowLeft,
    faEnvelope, faCartShopping, faChartColumn, faGear, faMapLocation, faBasketShopping, faSms, faCube, faFile,faShippingFast, faMinusSquare
} from '@fortawesome/free-solid-svg-icons';
import {getFormattedMessage} from '../shared/sharedMethod';
import {ShieldLock} from "react-bootstrap-icons";

export default [
    {
        title: 'dashboard.title',
        name: "dashboard",
        fontIcon: <FontAwesomeIcon icon={faPieChart}/>,
        to: '/app/dashboard',
        class: 'd-flex',
        permission: '',
        items: [
            {
                title: getFormattedMessage('dashboard.title'),
                to: '/app/dashboard',
            },
        ],
    },
    {
        title: 'products.title',
        name: "products",
        fontIcon: <FontAwesomeIcon icon={faBoxes}/>,
        to: '/app/products',
        class: 'd-flex',
        is_submenu: "true",
        permission: Permissions.MANAGE_PRODUCTS,
        subPath: {
            productsSubPath: "/app/products",
            categoriesSubPath : "/app/product-categories",
            brandsSubPath : "/app/brands",
            unitsSubPath : "/app/units",
            barcodeSubPath : "/app/print/barcode",
            qrcodeSubPath : "/app/print/qrcode",
        },
        subMenu: [
            {
                title: 'products.title',
                to: '/app/products',
                name: "products",
                class: 'd-flex',
                fontIcon: <FontAwesomeIcon icon={faBoxes}/>,
                permission: Permissions.MANAGE_PRODUCTS
            },
            {
                title: 'product.categories.title',
                name: "product categories",
                fontIcon: <FontAwesomeIcon icon={faBoxOpen}/>,
                to: '/app/product-categories',
                class: 'd-flex',
                permission: Permissions.MANAGE_PRODUCT_CATEGORIES,
            },
            {
                title: 'brands.title',
                name: "brands",
                fontIcon: <FontAwesomeIcon icon={faBookmark}/>,
                to: '/app/brands',
                path: '/app/create-brand',
                class: 'd-flex',
                permission: Permissions.MANAGE_BRANDS,
            },
            {
                title: 'units.title',
                name: "units",
                fontIcon: <FontAwesomeIcon icon={faQuoteRight}/>,
                to: '/app/units',
                class: 'd-flex',
                permission: Permissions.MANAGE_UNITS,
            },
            {
                title: 'print.barcode.title',
                name: "print barcode",
                fontIcon: <FontAwesomeIcon icon={faPrint}/>,
                to: '/app/print/barcode',
                class: 'd-flex',
                permission: Permissions.MANAGE_PRODUCTS,
            },
            {
                title: 'print.qrcode.title',
                name: "print qrcode",
                fontIcon: <FontAwesomeIcon icon={faPrint}/>,
                to: '/app/print/qrcode',
                class: 'd-flex',
                permission: Permissions.MANAGE_PRODUCTS,
            },
        ]
    },
    {
        title: "adjustments.title",
        name: "adjustments",
        fontIcon: <FontAwesomeIcon icon={faMapLocation}/>,
        to: '/app/adjustments',
        class: 'd-flex',
        permission: Permissions.MANAGE_ADJUSTMENTS,
        items: [
            {
                title: getFormattedMessage("adjustments.title"),
                to: '/app/adjustments'
            }
        ],
    },
    {
        title: "shipping.title",
        name: "shipping.title",
        fontIcon: <FontAwesomeIcon icon={faShippingFast}/>,
        to: '/app/charges-types?slug=shipping',
        class: 'd-flex',
        permission: Permissions.MANAGE_SHIPPING_TYPES,
        items: [
            {
                title: getFormattedMessage("shipping.title"),
                to: '/app/charges-types'
            }
        ],
    },
    {
        title: "tax.title",
        name: "tax.title",
        fontIcon: <FontAwesomeIcon icon={faShippingFast}/>,
        to: '/app/charges-types?slug=tax',
        class: 'd-flex',
        permission: Permissions.MANAGE_SHIPPING_TYPES,
        items: [
            {
                title: getFormattedMessage("tax.title"),
                to: '/app/charges-types'
            }
        ],
    },
    {
        title: 'quotations.title',
        name: "quotations.title",
        fontIcon: <FontAwesomeIcon icon={faBasketShopping}/>,
        to: '/app/quotations',
        class: 'd-flex',
        permission: Permissions.MANAGE_QUOTATION,
        items: [
            {
                title: getFormattedMessage("quotations.title"),
                to: '/app/quotations'
            }
        ],
    },
    {
        title: 'purchases.title',
        name: "purchases",
        fontIcon: <FontAwesomeIcon icon={faReceipt}/>,
        to: '/app/purchases',
        class: 'd-flex',
        is_submenu: "true",
        permission: Permissions.MANAGE_PURCHASE,
        subPath: {
            purchasesSubPath: "/app/purchases",
            purchaseReturnSubPath : "/app/purchase-return"
        },
        subMenu: [
            {
                title: 'purchases.title',
                name: "purchases",
                fontIcon: <FontAwesomeIcon icon={faReceipt}/>,
                to: '/app/purchases',
                class: 'd-flex',
                permission: Permissions.MANAGE_PURCHASE,
            },
            {
                title: 'purchases.return.title',
                name: "purchases return",
                fontIcon: <FontAwesomeIcon icon={faArrowLeft}/>,
                to: '/app/purchase-return',
                class: 'd-flex',
                permission: Permissions.MANAGE_PURCHASE_RETURN,
            },
        ]
    },
    {
        title: 'sales.title',
        name: "sales",
        fontIcon: <FontAwesomeIcon icon={faCartShopping}/>,
        to: '/app/sales',
        class: 'd-flex',
        is_submenu: "true",
        permission: Permissions.MANAGE_SALE,
        subPath: {
            salesSubPath: "/app/sales",
            salesReturnSubPath : "/app/sale-return"
        },
        subMenu: [
            {
                title: 'sales.title',
                name: "sales",
                fontIcon: <FontAwesomeIcon icon={faCartShopping}/>,
                to: '/app/sales',
                class: 'd-flex',
                permission: Permissions.MANAGE_SALE,
            },
            {
                title: 'sales-return.title',
                name: "sales return",
                fontIcon: <FontAwesomeIcon icon={faArrowRight}/>,
                to: '/app/sale-return',
                class: 'd-flex',
                permission: Permissions.MANAGE_SALE_RETURN,
            },
        ]
    },
    {
        title: "transfers.title",
        name: "transfers",
        fontIcon: <FontAwesomeIcon icon={faMapLocation}/>,
        to: '/app/transfers',
        class: 'd-flex',
        permission: Permissions.MANAGE_TRANSFERS,
        items: [
            {
                title: getFormattedMessage("transfers.title"),
                to: '/app/transfers'
            }
        ],
    },
    {
        title: "status-types.title",
        name: "status-types.title",
        fontIcon: <FontAwesomeIcon icon={faMinusSquare}/>,
        to: '/app/status-types',
        class: 'd-flex',
        permission: Permissions.MANAGE_STATUS_TYPES,
        items: [
            {
                title: getFormattedMessage("status-types.title"),
                to: '/app/status-types'
            }
        ],
    },
    {
        title: 'expenses.title',
        name: "expenses",
        fontIcon: <FontAwesomeIcon icon={faMoneyBills}/>,
        to: '/app/expenses',
        class: 'd-flex',
        is_submenu: "true",
        permission: Permissions.MANAGE_EXPENSES,
        subPath: {
            expensesSubPath: "/app/expenses",
            expenseCategoriesSubPath : "/app/expense-categories"
        },
        subMenu: [
            {
                title: 'expenses.title',
                name: "expenses",
                fontIcon: <FontAwesomeIcon icon={faMoneyBills}/>,
                to: '/app/expenses',
                class: 'd-flex',
                permission: Permissions.MANAGE_EXPENSES,
            },
            {
                title: 'expense.categories.title',
                name: "expense categories",
                fontIcon: <FontAwesomeIcon icon={faMoneyCheckDollar}/>,
                class: 'd-flex',
                permission: Permissions.MANAGE_EXPENSES_CATEGORIES,
                to: '/app/expense-categories'
            },

        ]
    },
    {
        title: 'pepole.title',
        name: "Pepoles",
        fontIcon: <FontAwesomeIcon icon={faUser}/>,
        to: '/app/suppliers',
        class: 'd-flex',
        is_submenu: "true",
        subPath: {
            customerSubPath: "/app/customers",
            userSubPath : "/app/users",
            suppliareSubPath : "/app/suppliers",
        },
        permission: Permissions.MANAGE_SUPPLIERS,
        subMenu: [
            {
                title: 'suppliers.title',
                name: "suppliers",
                fontIcon: <FontAwesomeIcon icon={faTruck}/>,
                to: '/app/suppliers',
                class: 'd-flex',
                permission: Permissions.MANAGE_SUPPLIERS,
            },
            {
                title: 'customers.title',
                name: "customers",
                fontIcon: <FontAwesomeIcon icon={faUserGroup}/>,
                to: '/app/customers',
                class: 'd-flex',
                permission: Permissions.MANAGE_CUSTOMERS,
            },
            {
                title: 'users.title',
                name: "users",
                fontIcon: <FontAwesomeIcon icon={faUser}/>,
                to: '/app/users',
                class: 'd-flex',
                permission: Permissions.MANAGE_USER,
            },
        ]
    },
    {
        title: 'roles.permissions.title',
        name: "roles",
        fontIcon: <ShieldLock/>,
        to: '/app/roles',
        class: 'd-flex',
        permission: Permissions.MANAGE_ROLES,
        items: [
            {
                title: getFormattedMessage('roles.title'),
                to: '/app/roles'
            }
        ],
    },
    {
        title: 'warehouse.title',
        name: "warehouse",
        fontIcon: <FontAwesomeIcon icon={faHome}/>,
        to: '/app/warehouse',
        class: 'd-flex',
        permission: Permissions.MANAGE_WAREHOUSES,
        items: [
            {
                title: getFormattedMessage('warehouse.title'),
                to: '/app/warehouse'
            },
        ],
    },
    {
        title: "reports.title",
        name: "reports",
        fontIcon: <FontAwesomeIcon icon={faChartColumn}/>,
        to: '/app/report/report-warehouse',
        path: '/app/report/report-sale',
        stockPath: '/app/report/report-stock',
        purchasePath: '/app/report/report-purchase',
        topSellingPath: '/app/report/report-top-selling-products',
        stockDetailPath: '/app/report/report-detail-stock',
        productQuantityAlertPath: '/app/report/report-product-quantity',
        supplierReportPath: '/app/report/suppliers',
        profitLossReportPath: '/app/report/profit-loss',
        supplierReportDetailsPath: '/app/report/suppliers/details',
        bestCustomerReportPath: '/app/report/best-customers',
        customerReportPath: '/app/report/customers',
        customerReportDetailsPath: '/app/report/customers/details',
        class: 'd-flex',
        isSamePrefix: 'true',
        permission: Permissions.MANAGE_REPORTS,
        subTitles:[
            {title: 'warehouse.reports.title'},
            {title: 'sale.reports.title'},
            {title: 'stock.reports.title'},
            {title: 'purchase.reports.title'},
            {title: 'top-selling-product.reports.title'},
            {title: 'product.quantity.alert.reports.title'},
            {title: 'supplier.report.title'},
            {title: 'best-customer.report.title'},
            {title: 'customer.report.title'},
            {title: 'customer.report.title'},
            {title: 'profit-loss.reports.title'},
            {title: 'best-customer.report.title'},
        ],
        items: [
            {
                title: getFormattedMessage('warehouse.reports.title'),
                to: '/app/report/report-warehouse'
            },
            {
                title: getFormattedMessage('sale.reports.title'),
                to: '/app/report/report-sale'
            },
            {
                title: getFormattedMessage('stock.reports.title'),
                to: '/app/report/report-stock',
                detail: '/app/report/report-detail-stock'
            },
            {
                title: getFormattedMessage('purchase.reports.title'),
                to: '/app/report/report-purchase'
            },
            {
                title: getFormattedMessage('top-selling-product.reports.title'),
                to: '/app/report/report-top-selling-products'
            },
            {
                title: getFormattedMessage("product.quantity.alert.reports.title"),
                to: '/app/report/report-product-quantity',
            },
            // {
            //     title: "Supplier Report",
            //     to: '/app/report/suppliers',
            // },
            {
                title: getFormattedMessage("supplier.report.title"),
                to: '/app/report/suppliers',
                detail: '/app/report/suppliers/details'
            },
            {
                title: getFormattedMessage("profit-loss.reports.title"),
                to: '/app/report/profit-loss'
            },
            {
                title: getFormattedMessage("best-customer.report.title"),
                to: '/app/report/best-customers'
            },
            {
                title: getFormattedMessage("customer.report.title"),
                to: '/app/report/customers',
                detail: '/app/report/customers/details'
            },
        ],
    },
    {
        title: 'currencies.title',
        name: "currencies",
        fontIcon: <FontAwesomeIcon icon={faDollarSign}/>,
        to: '/app/currencies',
        class: 'd-flex',
        permission: Permissions.MANAGE_CURRENCY,
        items: [
            {
                title: getFormattedMessage('currencies.title'),
                to: '/app/currencies'
            },
        ],
    },
    {
        title: 'template.title',
        name: "template",
        fontIcon: <FontAwesomeIcon icon={faFile}/>,
        to: '/app/email-templates',
        class: 'd-flex',
        is_submenu: "true",
        permission: Permissions.MANAGE_EMAIL_TEMPLATES,
        subPath: {
            emailTemplateSubPath: "/app/email-templates",
            smsTemplateSubPath : "/app/sms-templates",
            smsApiSubPath : "/app/sms-api"
        },
        subMenu: [
            {
                title: "email-template.title",
                name: "email-templates",
                fontIcon: <FontAwesomeIcon icon={faEnvelope}/>,
                to: '/app/email-templates',
                class: 'd-flex',
                permission: Permissions.MANAGE_EMAIL_TEMPLATES,
            },
            {
                title: "sms-template.title",
                name: "sms-templates",
                fontIcon: <FontAwesomeIcon icon={faSms}/>,
                to: '/app/sms-templates',
                class: 'd-flex',
                permission: Permissions.MANAGE_SMS_TEMPLATES,
            },
            {
                title: "sms-api.title",
                name: "sms-api",
                fontIcon: <FontAwesomeIcon icon={faCube}/>,
                to: '/app/sms-api',
                class: 'd-flex',
                permission: Permissions.MANAGE_SMS_API,
            },

        ]
    },
    {
        to: '/app/pos',
        class: 'd-none',
        name:"pos",
        title: "header.pos.title",
        permission: Permissions.MANAGE_POS_SCREEN,
    },
    {
        title: 'settings.title',
        name: "settings",
        fontIcon: <FontAwesomeIcon icon={faGear}/>,
        to: '/app/settings',
        prefixesPath: '/app/prefixes',
        mailSettingsPath: "/app/mail-settings",
        class: 'd-flex',
        isSamePrefix: 'true',
        permission: Permissions.MANAGE_SETTING,
        subTitles:[
            {title: 'prefix.title'},
            {title: 'mail-settings.title'},
        ],
        items: [
            {
                title: getFormattedMessage('settings.title'),
                to: '/app/settings'
            },
            {
                title: getFormattedMessage("prefix.title"),
                to: '/app/prefixes'
            },
            {
                title: getFormattedMessage("mail-settings.title"),
                to: '/app/mail-settings'
            },
        ],
    },
];
