#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
import django
from dotenv import dotenv_values

config = dotenv_values('./.env')

def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'python_server.settings')
    try:
        from django.core.management import execute_from_command_line
        django.setup()
        execute_from_command_line(['manage.py', 'runserver', config['PORT']])
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()