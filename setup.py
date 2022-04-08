from distutils.core import setup

setup(
    # Application name:
    name="VMIX Helper",
    
    # Version number (initial):
    version="0.1.0",
    
    # Application author details:
    author="Dan Thompson",
    author_email="danl_thompson@hotmail.com",
    
    # Packages
    packages=["app"],
    
    # Include additional files into the package
    include_package_data=True,
    
    # Details
    url="http://pypi.python.org/pypi/MyApplication_v010/",
    
    #
    license="LICENSE",
    description="Helpful utility to run VMix presentations",
    
    # long_description=open("README.txt").read(),
    
    # Dependent packages (distributions)
    install_requires=[
    "flask"
    ],
)