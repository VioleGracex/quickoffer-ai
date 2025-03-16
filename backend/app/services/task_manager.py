""" task_manager.py """
ongoing_tasks = {}

def cancel_task(request_id: str):
    if request_id in ongoing_tasks:
        ongoing_tasks[request_id]['cancelled'] = True
        return True
    return False

def is_task_cancelled(request_id: str):
    return ongoing_tasks.get(request_id, {}).get('cancelled', False)

def add_task(request_id: str):
    ongoing_tasks[request_id] = {"cancelled": False}

def remove_task(request_id: str):
    if request_id in ongoing_tasks:
        del ongoing_tasks[request_id]