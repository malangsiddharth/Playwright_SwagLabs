Feature: CheckOut Functionality

@CheckOut
  Scenario: Complete checkout flow
    Given Login into application
    When Select three random items
    When View My Cart
    Then Add Address
    When CheckOut the order
    Then Complete order

