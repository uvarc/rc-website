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
    "group_name": "RC_Staff",
    "project_name": "Test Project",
    "project_desc": "This is free text",
    "data_agreement_signed": true,
    "pi_uid": "UVAComputingID",
    "resources": {
      "hpc_service_units": {
        "CACS_Staff": {
          "tier": "ssz_project",
          "request_count": "1000",
          "billing_details": {
            "fdm_billing_info": [
              {
                "financial_contact": "First Name Last Name",
                "company": "234324",
                "business_unit": "3",
                "cost_center": "224",
                "fund": "a Fund",
                "gift": "",
                "grant": "",
                "designated": "",
                "project": "",
                "program_code": "a program",
                "function": "A Function",
                "activity": "an activity",
                "assignee": "an assignee"
              }
            ]
          }
        }
      }
    },
    "user_resources": []
  }
]
```
### **Renewal Requests (PUT)**
- The user selects an **existing SU** instead of filling in a new group.
- The only change allowed is updating the `update_date`.
- The API payload includes the **existing group**, **tier**, and **updated timestamp**.
```json
[
    {
        "group_name": "RC_Staff",
        "project_name": "Existing Project",
        "resources": {
            "hpc_service_units": {
                "CACS_Staff-ssz_standard": {
                    "tier": "ssz_standard",
                    "request_count": "50000",
                    "update_date": "2025-02-12T10:30:00Z"
                    "billing_details": {
                        "fdm_billing_info": [
                            {
                                "financial_contact": "First Name Last Name",
                                "company": "234324",
                                "business_unit": "3",
                                "cost_center": "224",
                                "fund": "a Fund",
                                "gift": "",
                                "grant": "",
                                "designated": "",
                                "project": "",
                                "program_code": "a program",
                                "function": "A Function",
                                "activity": "an activity",
                                "assignee": "an assignee"
                            }
                        ]
                    }
                }
            }
        }
    }
]
```
---

## 6. Form Submission & API Communication  

The `submitForm()` function determines whether to **POST** or **PUT** based on the selected **New vs Renewal** option.

- **New Requests →** `POST` to:  
  `https://uvarc-unified-service.pods.uvarc.io/uvarc/api/resource/rcwebform/user/{userId}`

- **Renewal Requests →** `PUT` to:  
  `https://uvarc-unified-service.pods.uvarc.io/uvarc/api/resource/rcwebform/user/{userId}/{resource_id}`

---

## 7. Validation & Error Handling  

Before submission, `validatePayload(payload)` checks for:

- Missing required fields (**group, tier, request count**).
- Duplicate **group/tier** combinations.
- Correct formatting of **billing details** (when required).

Errors trigger `showErrorMessage()`, and invalid fields are **marked red**.

---

## 8. UI Behaviors & Additional Features  

### ✅ **Real-Time Payload Preview**
- The function `updatePayloadPreview()` shows the request payload before submission.

### ✅ **Billing Visibility**
- The form automatically hides/shows **billing details** based on the selected **SU** or **Storage** option.

### ✅ **Sorting of Existing SU Table**
- **Newest allocations appear first** in the **Existing SU** table.
