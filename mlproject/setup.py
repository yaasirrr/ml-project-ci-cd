from setuptools import find_packages,setup
from typing import List

hyphen_e="-e ."
def get_requirement(file_path:str)->List[str]:
    requirements=[]
    with open(file_path) as file_obj:
        requirements=file_obj.readlines()
        requirements=[req.replace("/n","") for req in requirements]
        if hyphen_e in requirements:
            requirements.remove(hyphen_e)
    return requirements

setup(
    name='mlproject',
    version='0.0.1',
    author='yasir',
    author_email='muhammedyasir7777@gmail.com',
    packages=find_packages(),
    install_requires=get_requirement('requirement.txt')

)