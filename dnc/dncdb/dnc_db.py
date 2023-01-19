def import_db_contents(filename: str):
    with open(f"./dncdb/{filename}", "r+") as f1:
        res = ""
        for line in f1:
            if not line.strip().startswith("#"):
                res += line
        return res
