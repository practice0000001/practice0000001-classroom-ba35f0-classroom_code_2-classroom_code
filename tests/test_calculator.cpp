#include <gtest/gtest.h>
#include "calculator.h"

TEST(CalculatorTest, TestAdd) {
    Calculator calc;
    EXPECT_DOUBLE_EQ(calc.add(1, 1), 2);
}

TEST(CalculatorTest, TestSubtract) {
    Calculator calc;
    EXPECT_DOUBLE_EQ(calc.subtract(1, 1), 0);
}

TEST(CalculatorTest, TestMultiply) {
    Calculator calc;
    EXPECT_DOUBLE_EQ(calc.multiply(2, 3), 6);
}

TEST(CalculatorTest, TestDivide) {
    Calculator calc;
    EXPECT_DOUBLE_EQ(calc.divide(6, 3), 2);
}

TEST(CalculatorTest, TestDivideByZero) {
    Calculator calc;
    EXPECT_THROW(calc.divide(1, 0), std::invalid_argument);
}
