export const FIELDS_ERROR = 'FieldsError';

export const FIELDS_GENERIC_ERROR = {
  internalCode: 1000,
  details: 'errors.checkFields'
};

export const FIELDS_PRICES_NOT_FOUND = {
  internalCode: 1001,
  details: 'errors.fieldPriceNotFound'
};
export const FIELDS_SEPACODE_NOT_FOUND = {
  internalCode: 1002,
  details: 'errors.fieldSepaCodeNotFound'
};

export const FIELD_COMPANY_NOT_FOUND = {
  internalCode: 1003,
  details: 'errors.fieldCompanyNotFound'
};

export const FIELD_EVENTTYPE_NOT_FOUND = {
  internalCode: 1004,
  details: 'errors.fieldVideoHelpNotFound'
};

export const FIELD_SCHOOLYEAR_NOT_FOUND = {
  internalCode: 1005,
  details: 'errors.fieldSchoolYearNotFound'
};

export const FIELD_IBANDATA_NOT_FOUND_AND_SEPA_OR_WIRETRANSFER_ALLOWED = {
  internalCode: 1006,
  details: 'errors.fieldIbanDataNotFoundAndSepaAllowed'
};

export const FIELD_REDSYSDATA_NOT_FOUND_AND_REDSYS_ALLOWED = {
  internalCode: 1007,
  details: 'errors.fieldRedsysNotFoundAndRedsysAllowed'
};

export const FIELD_PRICES_ATTENDEES_REQUIRED = {
  internalCode: 1008,
  details: 'errors.fieldPricesAttendeesRequired'
};

export const FIELD_PRICES_BROTHERORSISTER_REQUIRED = {
  internalCode: 1009,
  details: 'errors.fieldPricesBrotherOrSisterRequired'
};

export const FIELD_PRICES_PARENT_REQUIRED = {
  internalCode: 1010,
  details: 'errors.fieldPricesParentRequired'
};

export const UNKNOWN_ERROR = {
  internalCode: 5000,
  details: 'errors.unknowError'
};

export const ERROR_CREATE_VISIT_NOT_AMPA_ID = {
  code: 400,
  internalCode: 11001,
  details: 'errors.createVisitNotAmpaId'
};

export const ERROR_CREATE_VISIT_NOT_STATUS = {
  code: 400,
  internalCode: 11002,
  details: 'errors.createVisitNotStatus'
};

export const ERROR_CREATE_EXIST_VISIT = {
  code: 400,
  internalCode: 11003,
  details: 'errors.createExistVisit'
};

export const NOT_ALLOWED = {
  code: 403,
  internalCode: 11003,
  details: 'errors.notAllowed'
};
// ***** 12000 - commercials */

export const ERROR_CREATE_SEPAXMLTOAMPA = {
  code: 400,
  internalCode: 12001,
  details: 'errors.createSepaXmlToAmpa'
};

// **** 2000 - Payment Group
export const PAYMENT_EVENT_NOT_USER = {
  code: 400,
  internalCode: 2000,
  details: 'errors.paymentEventNotUser'
};

export const PAYMENT_EVENT_RECURRENT_NOT_PAYMENT_METHOD = {
  code: 400,
  internalCode: 2001,
  details: 'errors.paymentEventRecurringNotPaymentMethod'
};

export const PAYMENT_EVENT_NOT_ACCEPT_MANUAL = {
  code: 400,
  internalCode: 2002,
  details: 'errors.paymentEventNotAcceptManual'
};

export const PAYMENT_EVENT_NOT_HAVE_PAYMENT_OR_MANUAL = {
  code: 400,
  internalCode: 2003,
  details: 'errors.paymentEventNotHavePaymentOrManual'
};

export const PAYMENT_EVENT_NOT_AVAILABLE = {
  code: 400,
  internalCode: 2003,
  details: 'errors.paymentEventNotAvailable'
};

export const PAYMENT_EVENT_OUT_DATE = {
  code: 400,
  internalCode: 2005,
  details: 'errors.paymentEventOutDate'
};

export const PAYMENT_EVENT_NOT_PARENT = {
  code: 400,
  internalCode: 2006,
  details: 'errors.paymentEventNotParent'
};

export const PAYMENT_EVENT_PARENT_NOT_ALLOWED = {
  code: 400,
  internalCode: 2006,
  details: 'errors.paymentEventParentNotAllowed'
};

export const PAYMENT_EVENT_NOT_STUDENT = {
  code: 400,
  internalCode: 2007,
  details: 'errors.paymentEventNotStudent'
};
export const PAYMENT_EVENT_SEND_ONE_STUDENT = {
  code: 400,
  internalCode: 2008,
  details: 'errors.paymentEventSendOneStudent'
};

export const PAYMENT_EVENT_USER_EXIST = {
  code: 400,
  internalCode: 2009,
  details: 'errors.paymentEventUserExist'
};

export const PAYMENT_EVENT_CREATE = {
  code: 400,
  internalCode: 2010,
  details: 'errors.paymentEventCreate'
};

export const PAYMENT_EVENT_FULL = {
  code: 400,
  internalCode: 2011,
  details: 'errors.paymentEventFull'
};

export const PAYMENT_EVENT_REDSYS_NOT_ALLOW_CARD = {
  code: 400,
  internalCode: 2012,
  details: 'errors.paymentEventNotAllowCard'
};

export const PAYMENT_EVENT_STRIPE_REQUIRE_CARD = {
  code: 400,
  internalCode: 2012,
  details: 'errors.paymentEventStripeRequireCard'
};
export const PAYMENT_EVENT_LEVEL_OR_COURSE_NOT_ALLOWED = {
  code: 400,
  internalCode: 2012,
  details: 'errors.paymentEventLevelNotAllowed'
};

export const PAYMENT_EVENT_NOT_ALLOW_MORE_PARENTS = {
  code: 400,
  internalCode: 2012,
  details: 'errors.paymentEventNotAllowMoreParents'
};

export const EVENT_IS_ONLY_FORM_MEMBER = {
  code: 400,
  internalCode: 2009,
  details: 'errors.eventIsOnlyForMembers'
};
export const PAYMENT_FOR_ATTENDEE_NOT_ALLOWED = {
  code: 400,
  internalCode: 2502,
  details: 'errors.paymentForAttendeeNotAllowed'
};

export const DISCOUNT_ERROR = {
  code: 400,
  internalCode: 85000,
  details: 'errors.invalidDiscountCode'
};
