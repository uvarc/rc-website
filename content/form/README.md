# 🏛 Combined Request Form - Research Computing

## 📌 Overview
The **Combined Request Form** is a dynamic web-based UI for **Service Unit (SU) Requests** and **Storage Requests**. The form handles **new allocations** and **renewals**, validates user inputs, generates API payloads, and submits requests using `POST` (New) and `PUT` (Renewal) methods.

---

## 📖 **Table of Contents**
1. [Form Structure](#form-structure)
2. [JavaScript Architecture](#javascript-architecture)
3. [Event Handling & Interactivity](#event-handling)
4. [Fetching and Processing User Data](#fetching-user-data)
5. [Payload Construction (New & Renewal Requests)](#payload-construction)
6. [Form Submission & API Communication](#form-submission)
7. [Validation & Error Handling](#validation-and-error-handling)
8. [UI Behaviors & Additional Features](#ui-behaviors)

---

## 📑 **1. Form Structure** <a id="form-structure"></a>
The form dynamically adjusts based on the selected request type.

### **Service Unit (SU) Requests**
- **New Request:** Users select a **Group**, **Tier**, and input billing details.
- **Renewal:** Users select from an **Existing SU Table**, and only the `update_date` is changed.

### **Storage Requests**
- **New Storage:** Users pick a **storage tier** and specify allocation details.
- **Modify Storage:** Users choose an existing project from the **Existing Storage Table**.

### **Billing Information**
- **Displayed dynamically** if a selected request requires billing.

---

## ⚙️ **2. JavaScript Architecture** <a id="javascript-architecture"></a>
The core JavaScript file **`combined-request-form.js`** manages:
- **Dynamic form updates** based on user selections.
- **Fetching and displaying user resources.**
- **Validating inputs** and preventing invalid submissions.
- **Building and submitting API payloads.**

### **Key JavaScript Functions**
| Function | Description |
|-------------------------|----------------|
| `fetchMetadata()` | Fetches storage tier limits and billing rules from API. |
| `fetchAndPopulateGroups()` | Retrieves user groups and resources dynamically. |
| `updatePayloadPreview()` | Shows real-time request preview before submission. |
| `validatePayload(payload)` | Ensures API payload structure is correct. |
| `submitForm(formData, payload)` | Sends request via `POST` (New) or `PUT` (Renewal). |
| `processUserResources(apiResponse)` | Populates user’s **Existing SU Table**. |

---

## 🖱 **3. Event Handling & Interactivity** <a id="event-handling"></a>
JavaScript dynamically updates the UI based on user actions.

### **Key Event Listeners**
| Event | Function Triggered | Description |
|-----------|------------------------|-----------------|
| Change on `request-type` | `toggleRequestFields()` | Toggles between **Service Unit** and **Storage Requests**. |
| Change on `new-or-renewal` | `toggleAllocationFields()` | Shows correct fields for **New vs Renewal**. |
| Change on `existing-project-allocation` | `updatePayloadPreview()` | Updates the API payload preview. |
| Change on any form input | `updateBillingVisibility()` | Shows/hides **Billing Information**. |
| Form Submit | `handleFormSubmit(event)` | Collects data, validates, and submits the request. |

---

## 🔄 **4. Fetching and Processing User Data** <a id="fetching-user-data"></a>
At page load, **`fetchAndPopulateGroups()`** retrieves:
- **User Groups**
- **Existing Service Unit Allocations**
- **Storage Requests**

Fetched data is stored in `consoleData` and updates:
1. **Existing SU Table** (`populateExistingServiceUnitsTable()`)
2. **Existing Storage Requests Table** (if applicable)

---

## 🛠 **5. Payload Construction (New & Renewal Requests)** <a id="payload-construction"></a>

### **New SU Requests (`POST`)**
1. User selects **Group** and **Tier**.
2. **Billing details** are included if applicable.
3. **Request count defaults to `1000`** unless specified.
4. **Payload structure:**
```json
[
    {
        "group_name": "CACS_Staff",
        "project_name": "Test Project",
        "project_desc": "Description here",
        "data_agreement_signed": true,
        "pi_uid": "kc2bj",
        "resources": {
            "hpc_service_units": {
                "CACS_Staff": {
                    "tier": "ssz_paid",
                    "request_count": "12000",
                    "billing_details": {
                        "fdm_billing_info": [
                            {
                                "company": "UVA_207",
                                "cost_center": "CC2153",
                                "fund": "FD068"
                            }
                        ]
                    }
                }
            }
        }
    }
]
