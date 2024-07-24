import openai
import os

# OpenAI API 키 설정
openai.api_key = os.getenv("OPENAI_API_KEY")

def get_code_feedback(student_code, test_results):
    prompt = f"""
    학생이 제출한 코드:
    {student_code}

    테스트 결과:
    {test_results}

    코드에서 잘못된 부분과 그 이유를 설명하고, 올바른 정답 코드를 제시해 주세요.
    """
    
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        max_tokens=1500
    )

    return response.choices[0].text.strip()

# 학생 코드와 테스트 결과 읽기
with open("src/main.cpp", "r") as file:
    student_code = file.read()

with open("result.log", "r") as file:
    test_results = file.read()

# ChatGPT로부터 피드백 받기
feedback = get_code_feedback(student_code, test_results)

# 피드백 출력
print("ChatGPT 피드백:")
print(feedback)

# 피드백을 로그 파일에 저장
with open("feedback.log", "w") as file:
    file.write(feedback)
