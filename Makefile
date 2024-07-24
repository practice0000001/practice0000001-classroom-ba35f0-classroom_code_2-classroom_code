all: main test_calculator

main: src/main.cpp src/calculator.cpp
	g++ -o main src/main.cpp src/calculator.cpp

test_calculator: tests/test_calculator.cpp src/calculator.cpp
	g++ -o test_calculator tests/test_calculator.cpp src/calculator.cpp -lgtest -lgtest_main -pthread

clean:
	rm -f main test_calculator
