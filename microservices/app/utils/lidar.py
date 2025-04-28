import laspy
import io

def is_las_file(data: io.BytesIO):
    try:
        las = laspy.read(data)
        return True
    except Exception as e:
        return False