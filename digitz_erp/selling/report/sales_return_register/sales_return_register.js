// Copyright (c) 2024, Rupesh P and contributors
// For license information, please see license.txt

frappe.query_reports["Sales Return Register"] = {
	"filters": [
		{
			"fieldname": "customer",
			"fieldtype": "Link",
			"label": "Customer",
			"options": "Customer",
			"width": 150,

		},
		{

			"fieldname": "from_date",
			"fieldtype": "Date",
			"label": "From Date",
			"width": 150,
			"default":frappe.datetime.month_start()

		},
		{
			"fieldname": "to_date",
			"fieldtype": "Date",
			"label": "To Date",
			"width": 150,
			"default":frappe.datetime.month_end()
		},
		{
			"fieldname": "warehouse",
			"fieldtype": "Link",
			"label": "Warehouse",
			"options": "Warehouse",
			"width": 150,
			"default": function () {
                var defaultWarehouse = "";
                frappe.call({
                    method: "digitz_erp.api.user_api.get_user_default_warehouse",
                    async: false,
                    callback: function (r) {
                        if (r && r.message) {
							console.log(r.message)
                            defaultWarehouse = r.message;
						}

						console.log(r)
                    },
                });

                return defaultWarehouse;
            },
		},
		{
			"fieldname": "credit_sale",
			"label": __("Credit Sale"),
			"fieldtype": "Select",
			"options": "Credit\nCash\nAll"
		},
		{
			"fieldname": "status",
			"label": __("Status"),
			"fieldtype": "Select",
			"options": "Draft\nSubmitted\nCancelled\nNot Cancelled",
			"default": "Not Cancelled"
		}
	]
};
