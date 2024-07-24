cmake_minimum_required(VERSION 3.10)

project(Calculator)

set(CMAKE_CXX_STANDARD 11)

include_directories(include)

add_executable(main src/main.cpp)
add_library(calculator src/calculator.cpp)
target_link_libraries(main calculator)

add_executable(test_calculator tests/test_calculator.cpp)
target_link_libraries(test_calculator calculator gtest gtest_main)
